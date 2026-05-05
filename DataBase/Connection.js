require('dotenv').config();
const fs = require("fs");

const Knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 12750,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // 1. Timeout da conexão TCP inicial (em milissegundos)
        connectTimeout: 60000, 
        ssl: {
            ca: fs.readFileSync("./ca.pem").toString(),
            rejectUnauthorized: false
        }
    },
    // 2. Configurações da Pool (gestão de conexões)
    pool: {
        min: 0,
        max: 10,
        // Tempo que o Knex espera por uma conexão livre antes de dar erro
        acquireTimeoutMillis: 60000, 
        // Tempo de espera para criar uma nova conexão na pool
        createTimeoutMillis: 30000,
        // Tempo para destruir uma conexão que não responde
        destroyTimeoutMillis: 5000,
        idleTimeoutMillis: 30000,
    }
});

module.exports = Knex;
