/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        primary: "#D2691E",     // Warm brown-orange
        secondary: "#FFB347",   // Warm light orange
        accent: "#0000FF",      // Soft peach
        accent2: "#FF0000",
        background: "#FFDDB5",  // Creamy white
        text: "#4B1C24",        // Deep warm brown
        border: "#4B1C24",      // Same warm brown
        error: "#E57373",       // Soft red
        success: "#F4A460",     // Sandy brown
        warning: "#FFC300",     // Warm yellow
        info: "#AF4035"         // Warm reddish tone
      },
      borderColor: {
        DEFAULT: 'black', // Default border color
      },
    },
  },
  plugins: [],
}

