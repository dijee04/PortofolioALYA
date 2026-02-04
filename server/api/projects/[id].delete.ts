import pool from '~/server/utils/db';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    try {
        const res = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);
        if (res.rowCount === 0) {
            throw createError({ statusCode: 404, statusMessage: 'Project not found' });
        }
        return { success: true, id };
    } catch (err: any) {
        if (err.statusCode) throw err;
        throw createError({ statusCode: 500, statusMessage: 'Database error', data: err });
    }
});
