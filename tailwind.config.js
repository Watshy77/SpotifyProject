/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#121212",
                "secondary": "#2a2a2a",
                "third": "#969696",
                "success": "",
                "info": "",
                "warning": "#FFD700",
                "danger": "#DC143C",
                "light": "#F0F8FF",
                "dark": "#000000",
            },
        },
    },
    plugins: [],
}
