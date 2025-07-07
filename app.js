const express = require('express');
const cors = require('cors');
const path = require('node:path');
const apiRouter = require('./routes/apiRouter');
const corsOptions = require('./utils/corsOptions');

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

// *******************************************************

const middleware = (req, res, next) => {

    const id = 11;

    req.user = { id };

    next();

}

const middleware2 = (req, res, next) => {


    if (req.user.id > 10) {
        return next();
    }

    res.status(500).json({ success: false, error: 'User ID undefined', code: 'AUTHENTICATION' });

}

const controller = (req, res) => {

    res.status(200).json({ success: true, message: 'We did it!' });

}

app.get('/bcit', middleware, middleware2, controller);




// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status


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