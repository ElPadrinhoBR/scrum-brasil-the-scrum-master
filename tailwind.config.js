/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pressstart: ['"Press Start 2P"', 'monospace'],
        silkscreen: ['"Silkscreen"', 'monospace'],
      },
      colors: {
        retro: {
          bg: '#0c0c14',
          panel: '#1a1a2e',
          border: '#3f3f74',
          accent: '#e2ab24',
          green: '#13c65e',
          red: '#f04343',
          blue: '#2c89f5',
          purple: '#843cf6',
          text: '#ffffff',
          dimmed: '#9a9aaf',
        }
      },
      boxShadow: {
        retro: '4px 4px 0px 0px #000',
        'retro-md': '6px 6px 0px 0px #000',
        'retro-lg': '8px 8px 0px 0px #000',
        'retro-inset': 'inset 4px 4px 0px 0px #000',
      }
    },
  },
  plugins: [],
}
