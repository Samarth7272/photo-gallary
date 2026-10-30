/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14082E',
        night: '#1E0B4B',
        pop: {
          pink: '#FF3D81',
          yellow: '#FFD23F',
          cyan: '#22D3EE',
          lime: '#B8F53D',
          violet: '#A78BFA',
          orange: '#FF8A3D',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        hard: '6px 6px 0 0 #14082E',
        'hard-sm': '4px 4px 0 0 #14082E',
      },
    },
  },
  plugins: [],
}
