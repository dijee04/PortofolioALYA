
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        return {};
    }
}

const env = loadEnv();
const pool = new pg.Pool({
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'postgres',
    password: env.DB_PASSWORD || 'password',
    database: env.DB_NAME || 'portfolio_db',
    port: parseInt(env.DB_PORT || '5432'),
});

async function seedUser() {
    try {
        const client = await pool.connect();

        console.log('Seeding Admin User...');

        // Data from screenshot:
        // Name: Alya Dijayanti
        // Email: alyadijayanti4@gmail.com
        // Password: $2y$12$vylgbq0OYNG... (Bcrypt hash from Laravel)
        // Note: Nuxt might need different hashing depending on auth lib, 
        // but let's persist the existing hash for now.

        const query = `
            INSERT INTO users (name, email, password, email_verified_at, created_at, updated_at) 
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (email) DO UPDATE 
            SET name = EXCLUDED.name, password = EXCLUDED.password;
        `;

        const values = [
            'Alya Dijayanti',
            'alyadijayanti4@gmail.com',
            '$2y$12$vylgbq0OYNGhvwYHAOUFOelzzO.r5fh8EZDKNALLJ2W...V3NUbDQlQh', // Copied roughly from image 
            '2026-02-03 07:20:20',
            '2026-02-03 07:20:20',
            '2026-02-03 08:19:26'
        ];

        await client.query(query, values);
        console.log('Admin user seeded successfully.');

        client.release();
    } catch (err) {
        console.error('Seeding user failed:', err);
    } finally {
        await pool.end();
    }
}

seedUser();
