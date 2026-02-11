import prisma from '../utils/prisma';

export default defineEventHandler(async (event) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                created_at: 'desc'
            }
        });

        // Parse JSON fields safely if stored as string, though Prisma handles JSON type natively if configured.
        // In our schema it is String (tech_stack String), so we parse it manually.

        const normalizedProjects = projects.map((project: any) => {
            let techStack = project.tech_stack;
            let parsedStack: string[] = [];

            if (typeof techStack === 'string') {
                try {
                    if (techStack.trim().startsWith('[') || techStack.trim().startsWith('{')) {
                        parsedStack = JSON.parse(techStack);
                    } else {
                        parsedStack = techStack.split(',').map(t => t.trim()).filter(Boolean);
                    }
                } catch {
                    parsedStack = [techStack];
                }
            }

            return {
                ...project,
                tech_stack: parsedStack
            };
        });

        return normalizedProjects;

    } catch (error) {
        console.error('Database error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch projects',
        });
    }
});
