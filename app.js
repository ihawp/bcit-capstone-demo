const express = require('express');
const cors = require('cors');
const path = require('node:path');
const apiRouter = require('./routes/apiRouter');
const corsOptions = require('./utils/corsOptions');

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

// *******************************************************



































const middleware2 = (req, res, next) => {


    if (!req.tokenhasAtoken) {
        return res.status(400).json({ 
            success: false,
            error: 'No token.',
            code: 'AUTHENTICATION_ERROR'
        });
    }

    next();

}

const middleware1 = (req, res, next) => {
    req.tokenhasAtoken = { id: 10, username: 'Warren' };
    next();
}

const controller = (req, res) => {

    res.json({ success: true });

}

app.get('/bcit', middleware1, middleware2, controller);











































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