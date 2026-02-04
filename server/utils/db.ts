import pg from 'pg';

const pool = new pg.Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'portfolio_db',
    port: parseInt(process.env.DB_PORT || '5432'),
    max: 10,
    idleTimeoutMillis: 30000,
});

export default pool;
