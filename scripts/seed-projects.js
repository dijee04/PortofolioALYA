
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

async function seed() {
    try {
        const client = await pool.connect();

        console.log('Seeding sample data...');

        const query = `
            INSERT INTO projects (title, type, description, image_url, tech_stack, github_url, live_url) 
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7),
            ($8, $9, $10, $11, $12, $13, $14)
            ON CONFLICT DO NOTHING;
        `;

        const values = [
            'E-Commerce App', 'software', 'A full-stack e-commerce platform built with Nuxt.', 'https://via.placeholder.com/600', '["Vue", "Nuxt", "PostgreSQL"]', 'https://github.com/alya/ecommerce', 'https://alya-shop.com',
            'Finance Dashboard', 'design', 'UI/UX case study for a fintech app.', 'https://via.placeholder.com/600', '["Figma", "Adobe XD"]', 'https://figma.com/file/123', 'https://behance.net/gallery/123'
        ];

        await client.query(query, values);
        console.log('Sample data seeded successfully.');

        client.release();
    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        await pool.end();
    }
}

seed();
