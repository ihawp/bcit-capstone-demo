const poolOptions = {
    host: 'localhost',
    database: 'bcit-example',
    password: 'root',
    user: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    maxIdle: 10
}

const poolOptionsAdmin = {
    host: 'localhost',
    database: 'bcit-example',
    password: 'root',
    user: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    maxIdle: 10
}

module.exports = {
    poolOptions,
    poolOptionsAdmin
}