import pool from '../utils/db';

export default defineEventHandler(async (event) => {
    try {
        const { rows } = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');

        // Parse JSON fields safely and normalize data
        const projects = (rows as any[]).map(project => {
            let techStack = project.tech_stack;

            // Normalize tech_stack to Array
            if (typeof techStack === 'string') {
                try {
                    // Start with basic JSON parse
                    if (techStack.trim().startsWith('[') || techStack.trim().startsWith('{')) {
                        techStack = JSON.parse(techStack);
                    } else {
                        // Comma separated fallback
                        techStack = techStack.split(',').map((t: string) => t.trim()).filter(Boolean);
                    }
                } catch (e) {
                    // If parse fails, treat as single item array if not empty
                    techStack = techStack ? [techStack] : [];
                }
            } else if (!Array.isArray(techStack)) {
                // If null or other type
                techStack = [];
            }

            return {
                ...project,
                tech_stack: Array.isArray(techStack) ? techStack : [techStack]
            };
        });

        return projects;
    } catch (error) {
        console.error('Database error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch projects',
            data: error
        });
    }
});
