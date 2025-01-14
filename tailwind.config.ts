import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,md,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './public/posts/**/*.{js,ts,jsx,tsx,md,mdx}'
  ],
  safelist: ['text-purple-400', 'dark:text-purple-500'],
  theme: {
    extend: {
      colors: {
        // background: 'var(--background)',
        // foreground: 'var(--foreground)'
      }
    }
  },
  plugins: []
} satisfies Config
