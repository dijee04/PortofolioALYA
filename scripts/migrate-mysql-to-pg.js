
import mysql from 'mysql2/promise';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- LOAD ENV FOR POSTGRES (DESTINATION) ---
function loadEnv(filepath) {
    try {
        const envFile = fs.readFileSync(filepath, 'utf8');
        const envConfig = {};
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                envConfig[key.trim()] = value.trim();
            }
        });
        return envConfig;
    } catch (e) {
        return {};
    }
}

const pgEnv = loadEnv(path.resolve(__dirname, '../.env'));

const pgConfig = {
    host: pgEnv.DB_HOST || 'localhost',
    user: pgEnv.DB_USER || 'postgres',
    password: pgEnv.DB_PASSWORD || 'password',
    database: pgEnv.DB_NAME || 'portfolio_db',
    port: parseInt(pgEnv.DB_PORT || '5432'),
};

// --- MYSQL CONFIG (SOURCE) ---
// Hardcoded from portfolio-laravel-backup/.env analysis
// DB_CONNECTION=mysql, DB_HOST=localhost, DB_PORT=3306, DB_DATABASE=portfolio_db, DB_USERNAME=root, DB_PASSWORD=
const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'portfolio_db', // Assuming same DB name as per backup env
    port: 3306
};

async function migrate() {
    console.log('--- STARTING MIGRATION ---');

    // 1. Connect to MySQL
    console.log('Connecting to MySQL (Source)...');
    let mysqlConn;
    try {
        mysqlConn = await mysql.createConnection(mysqlConfig);
        console.log('Connected to MySQL.');
    } catch (err) {
        console.error('Failed to connect to MySQL. Make sure XAMPP/MySQL is running.');
        console.error(err.message);
        process.exit(1);
    }

    // 2. Connect to Postgres
    console.log('Connecting to PostgreSQL (Destination)...');
    const pgPool = new pg.Pool(pgConfig);
    let pgClient;
    try {
        pgClient = await pgPool.connect();
        console.log('Connected to PostgreSQL.');
    } catch (err) {
        console.error('Failed to connect to PostgreSQL.');
        console.error(err.message);
        await mysqlConn.end();
        process.exit(1);
    }

    try {
        // 3. Fetch data from MySQL
        console.log('Fetching projects from MySQL...');
        const [rows] = await mysqlConn.execute('SELECT * FROM projects');
        console.log(`Found ${rows.length} projects in MySQL.`);

        if (rows.length === 0) {
            console.log('No data to migrate.');
            return;
        }

        // 4. Insert into Postgres
        console.log('Inserting into PostgreSQL...');

        // Optional: Clear existing data in Postgres to avoid duplicates?
        // User asked to "move", implying copying. I'll just upsert or insert.
        // Let's truncate for clean state as this is migration.
        await pgClient.query('TRUNCATE TABLE projects RESTART IDENTITY');

        for (const row of rows) {
            let techStack = row.tech_stack;
            // Ensure techStack is string for TEXT column in PG
            if (typeof techStack === 'object') {
                techStack = JSON.stringify(techStack);
            }

            const query = `
                INSERT INTO projects (title, type, description, image_url, tech_stack, github_url, live_url, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `;

            const values = [
                row.title,
                row.type || 'software',
                row.description,
                row.image_url,
                techStack,
                row.github_url,
                row.live_url,
                row.created_at || new Date(),
                row.updated_at || new Date()
            ];

            await pgClient.query(query, values);
            console.log(`Migrated: ${row.title}`);
        }

        console.log('--- MIGRATION SUCCESSFUL ---');

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await mysqlConn.end();
        pgClient.release();
        await pgPool.end();
    }
}

migrate();
