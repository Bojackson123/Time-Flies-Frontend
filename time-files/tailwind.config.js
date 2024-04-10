/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: null,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2.5rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["--font-poppins", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#348AF7",
        },
        dark: {
          DEFAULT: "#18212F",
          500: "#161925",
        },
      },
      backgroundImage: {
        G1: "linear-gradient(93.64deg, #6DD3F5 0%, #6455F0 95.99%)",
        "active-nav": `url('data:image/svg+xml,<svg width="51" height="2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.04 0C.467 0 0 .448 0 1s.466 1 1.04 1h1.175c.574 0 1.04-.448 1.04-1s-.466-1-1.04-1H1.04Z" fill="%23161925"/><path d="M1.04 0C.467 0 0 .448 0 1s.466 1 1.04 1h1.175c.574 0 1.04-.448 1.04-1s-.466-1-1.04-1H1.04Z" fill="url(%23a)"/><path d="M5.426 1c0-.552.466-1 1.04-1H9.81c.575 0 1.041.448 1.041 1s-.466 1-1.04 1H6.466c-.575 0-1.041-.448-1.041-1Z" fill="%23161925"/><path d="M5.426 1c0-.552.466-1 1.04-1H9.81c.575 0 1.041.448 1.041 1s-.466 1-1.04 1H6.466c-.575 0-1.041-.448-1.041-1Z" fill="url(%23b)"/><path d="M14.062 0c-.575 0-1.04.448-1.04 1s.465 1 1.04 1h4.43c.574 0 1.04-.448 1.04-1s-.466-1-1.04-1h-4.43Z" fill="%23161925"/><path d="M14.062 0c-.575 0-1.04.448-1.04 1s.465 1 1.04 1h4.43c.574 0 1.04-.448 1.04-1s-.466-1-1.04-1h-4.43Z" fill="url(%23c)"/><path d="M21.702 1c0-.552.466-1 1.041-1h6.6c.574 0 1.04.448 1.04 1s-.466 1-1.04 1h-6.6c-.575 0-1.04-.448-1.04-1Z" fill="%23161925"/><path d="M21.702 1c0-.552.466-1 1.041-1h6.6c.574 0 1.04.448 1.04 1s-.466 1-1.04 1h-6.6c-.575 0-1.04-.448-1.04-1Z" fill="url(%23d)"/><path d="M32.553 1c0-.552.466-1 1.04-1H49.96C50.534 0 51 .448 51 1s-.466 1-1.04 1H33.593c-.575 0-1.04-.448-1.04-1Z" fill="%23161925"/><path d="M32.553 1c0-.552.466-1 1.04-1H49.96C50.534 0 51 .448 51 1s-.466 1-1.04 1H33.593c-.575 0-1.04-.448-1.04-1Z" fill="url(%23e)"/><defs><linearGradient id="a" x1="0" y1="0" x2="14.338" y2="23.259" gradientUnits="userSpaceOnUse"><stop stop-color="%236DD3F5"/><stop offset="1" stop-color="%236455F0"/></linearGradient><linearGradient id="b" x1="0" y1="0" x2="14.338" y2="23.259" gradientUnits="userSpaceOnUse"><stop stop-color="%236DD3F5"/><stop offset="1" stop-color="%236455F0"/></linearGradient><linearGradient id="c" x1="0" y1="0" x2="14.338" y2="23.259" gradientUnits="userSpaceOnUse"><stop stop-color="%236DD3F5"/><stop offset="1" stop-color="%236455F0"/></linearGradient><linearGradient id="d" x1="0" y1="0" x2="14.338" y2="23.259" gradientUnits="userSpaceOnUse"><stop stop-color="%236DD3F5"/><stop offset="1" stop-color="%236455F0"/></linearGradient><linearGradient id="e" x1="0" y1="0" x2="14.338" y2="23.259" gradientUnits="userSpaceOnUse"><stop stop-color="%236DD3F5"/><stop offset="1" stop-color="%236455F0"/></linearGradient></defs></svg>')`,
      },
      boxShadow: {
        small: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
