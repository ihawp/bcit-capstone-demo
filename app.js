const express = require('express');
const cors = require('cors');
const path = require('node:path');
const apiRouter = require('./routes/apiRouter');
const corsOptions = require('./utils/corsOptions');

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

// *******************************************************

// Example From Presentation:

const middleware = (req, res, next) => {

    const { id } = req.params;

    if (id > 10) {
        return res.json({ success: false });
    }

    req.user = { id };

    next();

} 

const middleware2 = (req, res, next) => {

    if (!req.user) {
        return res.json({ success: false });
    }

    next();

}

const controller = (req, res) => {

    // gets some data from the database

    // const response
    const response = { data: req.user.id };

    res.json({ success: true, response });

}

app.get('/bcit/:id', middleware, middleware2, controller);

// *******************************************************

app.use('/api/v1', apiRouter);

app.use('/admin', express.static(path.join(__dirname, 'admin-frontend', 'dist')));
app.get('/admin/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-frontend', 'dist', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

module.exports = app;