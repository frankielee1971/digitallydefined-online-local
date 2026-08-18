/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bone: '#F7F4EF',
        cream: '#F7F4EF',
        ink: '#000000',
        orange: {
          DEFAULT: '#FF7A00',
          dark: '#E56A00',
        },
        blue: {
          DEFAULT: '#1E4AFF',
          dark: '#1638CC',
        },
        muted: '#5F5F5F',
      },
      fontFamily: {
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.08)',
        md: '0 4px 12px rgba(0, 0, 0, 0.10)',
      },
      letterSpacing: {
        label: '0.15em',
      },
    },
  },
  plugins: [],
};
