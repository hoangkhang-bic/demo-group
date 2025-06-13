        /** @type {import('tailwindcss').Config} */
        module.exports = {
          content: [
            "./src/**/*.{js,ts,jsx,tsx}", // Ionic React files
            "./node_modules/@ionic/react/**/*.{js,ts,jsx,tsx}", // To purge Ionic classes
          ],
            theme: {
              extend: {},
            },
            plugins: [],
          };