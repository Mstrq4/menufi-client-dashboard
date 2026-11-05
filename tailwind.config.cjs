/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#800000', // Maroon
                    light: '#991b1b',
                    dark: '#660000',
                },
                secondary: {
                    DEFAULT: '#FFD700', // Gold
                    light: '#FFE44D',
                    dark: '#B39700',
                },
                dark: {
                    bg: '#121010',
                    card: '#1E1E1E',
                    border: '#2A2A2A',
                    text: '#E5E7EB',
                    muted: '#9CA3AF'
                },
                light: {
                    bg: '#F3F4F6',
                    card: '#FFFFFF',
                    border: '#E5E7EB',
                    text: '#1F2937',
                    muted: '#6B7280'
                }
            },
            fontFamily: {
                sans: ['Cairo', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
