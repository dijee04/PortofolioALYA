// @ts-ignore
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default defineEventHandler(async (event) => {
    try {
        // AUTH CHECK
        const token = getCookie(event, 'auth_token');
        if (!token) {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized: Please login first' });
        }

        const files = await readMultipartFormData(event);
        if (!files || files.length === 0) {
            throw createError({ statusCode: 400, statusMessage: 'No file uploaded' });
        }

        const uploadedFile = files[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/jpg'];

        if (!uploadedFile.type || !validTypes.includes(uploadedFile.type)) {
            throw createError({ statusCode: 400, statusMessage: 'Invalid file type. Only PNG, JPG, and SVG are allowed.' });
        }

        // Upload to Cloudinary via Stream
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'portfolio_uploads', // Optional: Folder in Cloudinary
                    resource_type: 'auto'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(uploadedFile.data);
        });

        // @ts-ignore
        return {
            url: result.secure_url, // Cloudinary URL
            filename: uploadedFile.filename
        };

    } catch (error: any) {
        console.error('Upload error details:', error); // Log full error object
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.message || 'Upload failed', // Send actual error message to client for debugging
            data: error // Include error data in response
        });
    }
});
