import pool from '~/server/utils/db';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    try {
        const res = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
        if (res.rows.length === 0) {
            throw createError({ statusCode: 404, statusMessage: 'Project not found' });
        }
        return res.rows[0];
    } catch (err) {
        throw createError({ statusCode: 500, statusMessage: 'Database error', data: err });
    }
});
