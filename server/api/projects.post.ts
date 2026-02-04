import pool from '~/server/utils/db';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { title, type, description, image_url, tech_stack, github_url, live_url } = body;

    // Convert tech_stack to JSON string if it's an object/array, otherwise keep as is
    const techStackVal = typeof tech_stack === 'object' ? JSON.stringify(tech_stack) : tech_stack;

    try {
        const res = await pool.query(
            `INSERT INTO projects (title, type, description, image_url, tech_stack, github_url, live_url) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING *`,
            [title, type, description, image_url, techStackVal, github_url, live_url]
        );
        return res.rows[0];
    } catch (err) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Database error',
            data: err
        });
    }
});
