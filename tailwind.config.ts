import { nextui } from '@nextui-org/theme'
import { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/components/(button|card|date-picker|input|select|spinner|ripple|calendar|date-input|popover|listbox|divider|scroll-shadow).js',
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
} satisfies Config
