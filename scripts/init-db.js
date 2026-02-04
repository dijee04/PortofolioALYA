
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple env parser
function loadEnv() {
    try {
        const envPath = path.resolve(__dirname, '../.env');
        const envFile = fs.readFileSync(envPath, 'utf8');
        const envConfig = {};
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                envConfig[key.trim()] = value.trim();
            }
        });
        return envConfig;
    } catch (e) {
        console.error('Could not load .env file', e);
        return {};
    }
}

const env = loadEnv();
const { Pool } = pg;

const config = {
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'postgres',
    password: env.DB_PASSWORD || 'password',
    port: parseInt(env.DB_PORT || '5432'),
};

const dbName = env.DB_NAME || 'portfolio_db';

async function initDb() {
    console.log(`Connecting to PostgreSQL at ${config.host}:${config.port}...`);

    // Connect to default 'postgres' db to create target db
    const rootPool = new Pool({ ...config, database: 'postgres' });

    try {
        const client = await rootPool.connect();
        console.log('Connected to postgres database.');

        // Check if database exists
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
        if (res.rowCount === 0) {
            console.log(`Database '${dbName}' does not exist. Creating...`);
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database '${dbName}' created.`);
        } else {
            console.log(`Database '${dbName}' already exists.`);
        }
        client.release();
    } catch (err) {
        console.error('Error connecting to postgres database:', err);
        process.exit(1);
    } finally {
        await rootPool.end();
    }

    // Connect to target db to run schema
    console.log(`Connecting to '${dbName}'...`);
    const dbPool = new Pool({ ...config, database: dbName });

    try {
        const client = await dbPool.connect();
        const schemaPath = path.resolve(__dirname, '../postgres_schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Running schema migration...');
        await client.query(schemaSql);
        console.log('Schema setup completed successfully!');

        client.release();
    } catch (err) {
        console.error(`Error running schema on '${dbName}':`, err);
    } finally {
        await dbPool.end();
    }
}

initDb();
