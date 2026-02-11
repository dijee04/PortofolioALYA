import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue"
    ],

    theme: {
        extend: {
            colors: {
                primary: "#F472B6", // Vibrant Pink
                "background-light": "#F5F3ED", // Warm Cream
                "background-dark": "#1A1A1A", // Dark Charcoal
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ["Outfit", "sans-serif"], // Changed to Outfit for Neo-brutalism look
                handwriting: ["Gloria Hallelujah", "cursive"],
                body: ["Space Grotesk", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "12px",
            },
        },
    },

    plugins: [forms],
};
