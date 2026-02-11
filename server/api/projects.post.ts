import pool from '~/server/utils/db';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {
        title, type, description, image_url, tech_stack, github_url, live_url,
        problem_statement, solution_details, process_details, gallery_images, behance_url
    } = body;

    // Convert arrays/objects to JSON strings for database
    const techStackVal = typeof tech_stack === 'object' ? JSON.stringify(tech_stack) : tech_stack;
    const galleryVal = typeof gallery_images === 'object' ? JSON.stringify(gallery_images) : gallery_images;

    try {
        const res = await pool.query(
            `INSERT INTO projects (
                title, type, description, image_url, tech_stack, github_url, live_url,
                problem_statement, solution_details, process_details, gallery_images, behance_url
            ) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
             RETURNING *`,
            [
                title, type, description, image_url, techStackVal, github_url, live_url,
                problem_statement, solution_details, process_details, galleryVal, behance_url
            ]
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
