# Express.js Post Managing Application (CMS)

---

## Project Overview

**What We Built:** A simple CRUD application with Express.js, MySQL, and React.

**Key Features:**
- **Public Frontend**: User-facing blog/portfolio display
- **Admin Frontend**: Content management interface
- **RESTful API**: Full CRUD operations for blog posts
- **Database Integration**: MySQL with connection pooling
- **Security Features**: Input validation, CORS configuration, rate limiting

**Note:** There is no user-authentication included in this demo.

---

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Public        │    │   Admin         │    │   Express.js    │
│   Frontend      │    │   Frontend      │    │   Backend       │
│   (React)       │    │   (React)       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │             │         │
         └───────────────────────└─────────────┘         │
                                                         │
                    ┌─────────────────┐                  │
                    │   MySQL         │                  │
                    │   Database      │──────────────────┘
                    └─────────────────┘
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
```javascript
// apiRouter.js - API versioning
const apiRouter = express.Router();
apiRouter.use('/posts', postsRouter);

// postsRouter.js - RESTful endpoints
postsRouter.get('/', selectController);      // GET /api/v1/posts
postsRouter.post('/', insertController);     // POST /api/v1/posts
postsRouter.put('/:id', updateController);   // PUT /api/v1/posts/:id
postsRouter.delete('/:id', deleteController); // DELETE /api/v1/posts/:id
```

---

## Key Express.js Features Implemented

### 1. **Middleware Stack**
- **express.json()**: Parse JSON request bodies
- **CORS**: Cross-origin resource sharing with custom options
- **Static File Serving**: Serve React frontend builds
- **Error Handling**: Centralized error responses

### 2. **Controller Pattern**
```javascript
// selectController.js - Example controller
const selectController = async (req, res) => {
    try {
        const response = await selectAllPosts();
        if (response.length == 0) {
            throw new Error();
        }
        req.retrievedPosts = response;
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: 'Database error', 
            code: 'DATABASE_ERROR' 
        });
    }
    return res.status(200).json({ 
        success: true, 
        data: req.retrievedPosts, 
        message: 'Successfully retrieved posts.' 
    });
}
```

### 3. **Input Validation & Sanitization**
```javascript
// insertController.js - Data validation
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
```javascript
// pool.js - MySQL connection management
const mysql = require('mysql2/promise');
const pool = mysql.createPool(poolOptions);
const adminPool = mysql.createPool(poolOptionsAdmin);
```

### 2. **Prepared Statements**
```javascript
// postQueries.js - SQL queries with parameterization
const selectAllPosts = async () => {
    const [response] = await pool.execute(
        'SELECT * FROM `portfolio-posts` ORDER BY id DESC LIMIT 25',
        []
    );
    return response;
}
```

### 3. **Database Schema**
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
- **XSS Prevention**: HTML escaping with validator.escape()
- **SQL Injection Prevention**: Prepared statements
- **Input Validation**: Length and format checking

### 3. **Error Handling**
- **Consistent Error Responses**: Standardized JSON error format
- **Error Codes**: Specific error codes for different failure types
- **Graceful Degradation**: Proper HTTP status codes

---

## Dependencies & Technologies

### **Core Express.js Stack**
- **express**: Web framework
- **mysql2**: Database driver with promise support
- **cors**: Cross-origin resource sharing
- **express-validator**: Input validation (referenced in comments)

### **Security & Utilities**
- **bcryptjs**: Password hashing (for future auth)
- **jsonwebtoken**: JWT authentication (for future auth)
- **express-rate-limit**: Rate limiting
- **validator**: Input sanitization
- **winston**: Logging

### **Frontend Technologies**
- **React**: Frontend framework
- **Vite**: Build tool
- **React Router**: Client-side routing

---

## Frontend Integration

### 1. **Public Frontend** (`/`)
- Displays blog posts to visitors
- React-based with responsive design
- Fetches data from Express.js API

### 2. **Admin Frontend** (`/admin`)
- Content management interface
- CRUD operations for blog posts
- Form validation and real-time updates

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

## Deployment & Production Features

### 1. **Environment Configuration**
- **dotenv**: Environment variable management
- **Port Configuration**: Configurable server port
- **Database Configuration**: Separate dev/prod database settings

### 2. **Performance Optimizations**
- **Connection Pooling**: Efficient database connections
- **Static File Serving**: Optimized frontend delivery
- **Compression**: Response compression (compression middleware)

### 3. **Monitoring & Logging**
- **Winston**: Structured logging
- **Error Tracking**: Comprehensive error handling
- **Request Logging**: API request monitoring

---

## API Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/api/v1/posts` | Retrieve all posts | `{success: true, data: [...], message: "..."}` |
| POST | `/api/v1/posts` | Create new post | `{success: true, data: {...}, message: "..."}` |
| PUT | `/api/v1/posts/:id` | Update existing post | `{success: true, data: {...}, message: "..."}` |
| DELETE | `/api/v1/posts/:id` | Delete post | `{success: true, message: "..."}` |

---

## Key Express.js Patterns Demonstrated

### 1. **MVC Architecture**
- **Models**: Database queries in `utils/postQueries.js`
- **Views**: React frontend components
- **Controllers**: Request handlers in `controllers/`

### 2. **Middleware Pattern**
- **Application-level**: CORS, JSON parsing, static files
- **Route-level**: API versioning and organization
- **Error handling**: Centralized error responses

### 3. **RESTful Design**
- **Resource-based URLs**: `/api/v1/posts`
- **HTTP Methods**: GET, POST, PUT, DELETE
- **Consistent Response Format**: JSON with success/error indicators

---

## What to do from here:

### **Authentication & Authorization**
- JWT-based authentication
- Role-based access control
- Session management
(Read RFC 6749 https://datatracker.ietf.org/doc/html/rfc6749)

### **Advanced Features**
- File uploads with Multer
- Email notifications with Nodemailer
- Scheduled tasks with node-cron
- Rate limiting implementation

### **Scalability**
- Database indexing optimization
- Caching strategies

The packages needed for these things are already included in package.json!

Checkout this repository for an example of a full implementation https://github.com/ihawp/cms-portfolio.

---

*Built with Express.js 5.1.0, MySQL2, and React* 