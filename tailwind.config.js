/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        boundBg: 'var(--bg)',
        boundCard: 'var(--card)',
        boundRaise: 'var(--raise)',
        boundSunken: 'var(--sunken)',
        boundFg: 'var(--fg)',
        boundAcc: 'var(--acc)',
        boundAcc2: 'var(--acc2)',
        boundOk: 'var(--ok)',
        boundWarn: 'var(--warn)',
        boundBad: 'var(--bad)',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Bricolage Grotesque', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        bengali: ['Noto Sans Bengali', 'sans-serif'],
      },
      boxShadow: {
        'glow-acc': '0 0 25px -5px var(--accSoft)',
        'phone-dark': '0 30px 80px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)',
        'phone-light': '0 30px 80px -15px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
