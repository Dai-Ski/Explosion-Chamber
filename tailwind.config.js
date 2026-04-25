/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        card: '#111111',
        primary: '#FFFFFF',
        accent: '#FF0033', // Vibrant Red
        success: '#00FF66', // Vibrant Green
        warning: '#FFCC00', // Vibrant Yellow
        info: '#00CCFF',    // Vibrant Blue
        purple: '#CC00FF',  // Vibrant Purple
        muted: '#2A2A2A',
      },
      boxShadow: {
        'glow-accent': '0 0 20px rgba(255, 0, 51, 0.3)',
        'glow-success': '0 0 20px rgba(0, 255, 102, 0.3)',
        'glow-info': '0 0 20px rgba(0, 204, 255, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        }
      }
    },
  },
  plugins: [],
}
