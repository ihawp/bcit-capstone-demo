const express = require('express');
const cors = require('cors');
const path = require('node:path');
const apiRouter = require('./routes/apiRouter');
const corsOptions = require('./utils/corsOptions');

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

// *******************************************************














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