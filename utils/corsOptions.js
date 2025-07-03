const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000',],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
    credentials: true,
    maxAge: 86400,
}

module.exports = corsOptions;