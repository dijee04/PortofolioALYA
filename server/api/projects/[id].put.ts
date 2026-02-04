import pool from '~/server/utils/db';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readBody(event);
    const { title, type, description, image_url, tech_stack, github_url, live_url } = body;

    const techStackVal = typeof tech_stack === 'object' ? JSON.stringify(tech_stack) : tech_stack;

    try {
        const res = await pool.query(
            `UPDATE projects 
             SET title=$1, type=$2, description=$3, image_url=$4, tech_stack=$5, github_url=$6, live_url=$7, updated_at=NOW() 
             WHERE id=$8 
             RETURNING *`,
            [title, type, description, image_url, techStackVal, github_url, live_url, id]
        );

        if (res.rows.length === 0) {
            throw createError({ statusCode: 404, statusMessage: 'Project not found' });
        }
        return res.rows[0];
    } catch (err: any) {
        if (err.statusCode) throw err;
        throw createError({ statusCode: 500, statusMessage: 'Database error', data: err });
    }
});
