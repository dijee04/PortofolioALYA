import pg from 'pg';

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    // Fallback if DATABASE_URL is not set (local development)
    ...(process.env.DATABASE_URL ? {} : {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'portfolio_db',
        port: parseInt(process.env.DB_PORT || '5432'),
    }),
    max: 10,
    idleTimeoutMillis: 30000,
});

export default pool;
