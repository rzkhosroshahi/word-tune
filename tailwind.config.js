/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  safelist: [
    {
      pattern: /(bg|text|border|bg-gradient)-(violet|slate|zinc)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['lg', 'hover', 'focus', 'lg:hover', 'dark']
    }
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
