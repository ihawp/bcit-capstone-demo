# Express.js Post Managing Application (CMS)

---

## Project Overview

**What We Built:** A simple CRUD application with Express.js, MySQL, and React.

**Key Features:**
- **Public Frontend**: User-facing blog/portfolio display.
- **Admin Frontend**: Content management interface.
- **RESTful API**: Full CRUD operations for blog posts.
- **Database Integration**: MySQL with connection pooling.
- **Security Features**: Input validation, CORS configuration.

**Note:** There is no user-authentication included in this demo.

---

## Architecture Overview

```
┌─────────────────┐      ┌─────────────────┐
│   Public        │      │     Admin       │
│   Frontend      │      │   Frontend      │
│   (React)       │      │   (React)       │
└─────────────────┘      └─────────────────┘
         │                     │
         └────────────┬────────┘
                      │
              ┌───────────────┐
              │  Express.js   │
              │   Backend     │
              └──────┬────────┘
                     │
              ┌───────────────┐
              │     MySQL     │
              │   Database    │
              └───────────────┘
              
```

---

## Set It Up Locally

### Watch The Video

[![](https://img.youtube.com/vi/wHfDE7OnPTQ/0.jpg)](https://www.youtube.com/watch?v=wHfDE7OnPTQ)

### Clone

```
C://> git clone https://github.com/ihawp/bcit-capstone-demo.git
```

### Setup Server

```
C://> cd bcit-capstone-demo
```

```
C://bcit-capstone-demo> npm install
```

#### Database Import
Included in the cloned files is a database export titled ```bcit-example.sql```. Inside of phpMyAdmin create a new database titled ```bcit-example```. Once created, navigate to the import page, press ```Choose file``` and import the ```bcit-example.sql``` file. Scroll to the bottom of the page and press the confirmation button. You will now have a table called ```portfolio-posts``` inside of the ```bcit-example``` database.

#### Database Login

If you have a custom phpMyAdmin login you can alter the account options in ```/admin-frontend/utils/poolOptions.js```:

```javascript
const poolOptions = {
    host: 'localhost', // You will not need to change this unless you plan to host a database seperately from where you host your Node.js application.
    database: 'bcit-example', // If you decide to alter the name of the database change that information here.
    password: '', // Enter a new password here.
    user: 'root', // Enter a new username here.
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    maxIdle: 10 // Learn about the beside/above options here: https://sidorares.github.io/node-mysql2/docs
}
```

### Setup Admin-Frontend

```
C://bcit-capstone-demo> cd admin-frontend
C://bcit-capstone-demo/admin-frontend> npm install
C://bcit-capstone-demo/admin-frontend> npm run build
C://bcit-capstone-demo/admin-frontend> cd ..
```

### Setup Frontend

```
C://bcit-capstone-demo> cd frontend
C://bcit-capstone-demo/frontend> npm install
C://bcit-capstone-demo/frontend> npm run build
```

### Host The Application

If all went well you can now ```cd``` out of the ```frontend``` directory back to the ```bcit-capstone-demo``` parent directory and run ```npm start```. This will host the Express.js server on ```localhost:3000```.

If you access the application at ```localhost:3000``` you will be presented with the built ```frontend```. If you access at ```localhost:3000/admin``` you will be presented with a dashboard to [CRUD](https://developer.mozilla.org/en-US/docs/Glossary/CRUD) the sites content.

```
C://bcit-capstone-demo/frontend> cd ..
C://bcit-capstone-demo> npm start
```

---

## Express.js Implementation

### 1. **Application Structure**
```javascript
// app.js - Main Express application
const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/v1', apiRouter);

// Serve static frontend files
app.use('/admin', express.static(path.join(__dirname, 'admin-frontend', 'dist')));
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
```

### 2. **Routing Architecture**

- [PUT vs PATCH](https://www.geeksforgeeks.org/javascript/difference-between-put-and-patch-request/).
- [Routes and Controllers](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes).

```javascript
// apiRouter.js - API versioning
const apiRouter = express.Router();
apiRouter.use('/posts', postsRouter);

// postsRouter.js - RESTful endpoints
postsRouter.get('/', selectController); // GET /api/v1/posts
postsRouter.post('/', insertController); // POST /api/v1/posts
postsRouter.put('/:id', updateController); // PUT /api/v1/posts/:id
postsRouter.delete('/:id', deleteController); // DELETE /api/v1/posts/:id
```

---

## Key Express.js Features Implemented

### 1. **Middleware Stack**
- **express.json()**: Parse JSON request bodies.
- **CORS**: Cross-origin resource sharing with custom options.
- **Static File Serving**: Serve React frontend builds.

### 2. **Controller Pattern**
```javascript
// selectController.js - Example controller
const selectController = async (req, res) => {
    try {

        // Select posts from database.
        const response = await selectAllPosts();

        // Verify if posts have been found.
        if (response.length == 0) {
            throw new Error();
        }

        // Save the retrieved posts to the request object.
        req.retrievedPosts = response;

    } catch (error) {

        // Return an error if something goes wrong during the database operation.
        return res.status(500).json({ 
            success: false, 
            error: 'Database error', 
            code: 'DATABASE_ERROR' 
        });
    }

    // Return the posts saved in req.retrievedPosts
    return res.status(200).json({ 
        success: true, 
        data: req.retrievedPosts, 
        message: 'Successfully retrieved posts.' 
    });
}
```

### 3. **Input Validation & Sanitization**

- [express-validator](https://express-validator.github.io/docs/).
- [validator](https://www.npmjs.com/package/validator).

```javascript
// insertController.js - Data validation
// This example uses the validator package, checkout the express-validator package for a more ideal approach.
title = validator.trim(title);
title = validator.escape(title);

if (!validator.isLength(title, { min: 1, max: 255 })) {
    return res.status(400).json({ 
        success: false, 
        error: 'Incorrect inputs.', 
        code: 'USER_ERROR' 
    });
}
```

---

## Database Integration

### 1. **Connection Pooling**

[Learn about mysql2 connection pools](https://sidorares.github.io/node-mysql2/docs#using-connection-pools).

```javascript
// pool.js - MySQL connection management
const mysql = require('mysql2/promise');
const pool = mysql.createPool(poolOptions);
const adminPool = mysql.createPool(poolOptionsAdmin);
```

### 2. **Prepared Statements**
```javascript
// postQueries.js - SQL queries with parameterization
const updatePost = async (data) => {
    const [response] = await adminPool.execute(
        'UPDATE `portfolio-posts` SET title = ?, summary = ?, content = ?, time_created = CURRENT_TIMESTAMP(6) WHERE id = ?',
        [data.title, data.summary, data.content, data.id]
    );
    return response;
}
```

### 3. **Database Schema**

There is only one table included in this schema.

```sql
CREATE TABLE `portfolio-posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` tinytext NOT NULL,
  `summary` tinytext NOT NULL,
  `content` text NOT NULL,
  `time_created` timestamp(6) DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
);
```

---

## Security Features

### 1. **CORS Configuration**
```javascript
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    maxAge: 86400,
}
```

### 2. **Input Sanitization**
- **XSS Prevention**: HTML escaping with validator.escape().
- **SQL Injection Prevention**: Prepared statements.
- **Input Validation**: Length and format checking.

### 3. **Error Handling**
- **Consistent Error Responses**: Standardized JSON error format.
- **Error Codes**: Specific error codes for different failure types.
- **Graceful Degradation**: Proper HTTP status codes.

---

## Dependencies & Technologies

### **Core Express.js Stack**
- **express**: Web framework.
- **mysql2**: Database driver with promise support.
- **cors**: Cross-origin resource sharing.
- **validator**: Input validation (referenced in comments).

### **Frontend Technologies**
- **React**: Frontend framework.
- **Vite**: Build tool.
- **React Router**: Client-side routing.

---

## Frontend Integration

### 1. **Public Frontend** (`/`)
- Displays blog posts to visitors.
- React-based with responsive design.
- Fetches data from Express.js API.

### 2. **Admin Frontend** (`/admin`)
- Content management interface.
- CRUD operations for blog posts.
- Form validation and real-time updates.

### 3. **API Communication**
```javascript
// Frontend API calls
const response = await fetch('/api/v1/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
});
```

---

## API Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/api/v1/posts` | Retrieve all posts | `{success: true, data: [...], message: "..."}` |
| POST | `/api/v1/posts` | Create new post | `{success: true, data: {...}, message: "..."}` |
| PUT | `/api/v1/posts/:id` | Update existing post | `{success: true, data: {...}, message: "..."}` |
| DELETE | `/api/v1/posts/:id` | Delete post | `{success: true, message: "..."}` |

---

## Patterns

### 1. **MVC Architecture**
- **Models**: Database queries in `utils/postQueries.js`.
- **Views**: React frontend components.
- **Controllers**: Request handlers in `controllers/`.

### 2. **Middleware Pattern**
- **Application-level**: CORS, JSON parsing, static files.
- **Route-level**: API versioning and organization.
- **Error handling**: Centralized error responses.

### 3. **RESTful Design**
- **Resource-based URLs**: `/api/v1/posts`
- **HTTP Methods**: GET, POST, PUT, DELETE.
- **Consistent Response Format**: JSON with success/error indicators.

---

## What to do from here:

### **Learn The Basics (Resources)**
- Documentation for the most recent version of Express.js (5.x): https://expressjs.com/en/5x/api.html
- On the same site as above use the header menu to find all necessary Express.js related resources. **Getting Started** and **Guide** will be the most useful.
- If you want to build an app with user accounts (and access/refresh tokens that can be revoked) read RFC 6749 https://datatracker.ietf.org/doc/html/rfc6749.

### **Authentication & Authorization**
- JWT-based authentication.
- Role-based access control.
- Session management.

### **Advanced Features**
- File uploads with Multer.
- Email notifications with Nodemailer.
- Scheduled tasks with node-cron.
- Rate limiting implementation.

### **Scalability**
- Database indexing optimization.
- Caching strategies.
- Environment Variables (dotenv).

The packages needed for these things are already included in package.json.

Checkout this repository for an example of an implementation with authenticated admin accounts https://github.com/ihawp/cms-portfolio.

A next step for the repository mentioned above would be adding roles and utilizing the authentication system on the public facing ***/frontend*** React app.

---

*Built with Express.js 5.1.0, MySQL2, and React* 