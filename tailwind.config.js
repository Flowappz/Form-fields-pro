/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                "custom-shadow": "0px 1px 1px -1px rgba(0, 0, 0, 0.13) inset, 0px 3px 3px -3px rgba(0, 0, 0, 0.17) inset, 0px 4px 4px -4px rgba(0, 0, 0, 0.17) inset, 0px 8px 8px -8px rgba(0, 0, 0, 0.17) inset, 0px 12px 12px -12px rgba(0, 0, 0, 0.13) inset, 0px 16px 16px -16px rgba(0, 0, 0, 0.13) inset"
            }
        },
    },
    plugins: [],
};
