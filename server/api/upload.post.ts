import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export default defineEventHandler(async (event) => {
    try {
        const files = await readMultipartFormData(event);
        if (!files || files.length === 0) {
            throw createError({ statusCode: 400, statusMessage: 'No file uploaded' });
        }

        const uploadedFile = files[0]; // Assume single file upload
        const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/jpg'];

        if (!validTypes.includes(uploadedFile.type)) {
            throw createError({ statusCode: 400, statusMessage: 'Invalid file type. Only PNG, JPG, and SVG are allowed.' });
        }

        const ext = uploadedFile.filename ? path.extname(uploadedFile.filename) : '.jpg';
        const fileName = `${randomUUID()}${ext}`;
        const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

        // Ensure directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(filePath, uploadedFile.data);

        return {
            url: `/uploads/${fileName}`,
            filename: uploadedFile.filename
        };

    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Upload failed',
        });
    }
});
