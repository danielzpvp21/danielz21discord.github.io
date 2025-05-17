/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
    './index.html',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
        chrome: {
          light: 'hsl(var(--chrome-light))',
          dark: 'hsl(var(--chrome-dark))',
          border: 'hsl(var(--chrome-border))',
          highlight: 'hsl(var(--chrome-highlight))',
          shadow: 'hsl(var(--chrome-shadow))',
        }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
        'gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient': 'gradient 15s ease infinite',
			},
      boxShadow: {
        'chrome': 'inset 0 1px 1px hsl(var(--chrome-highlight) / 0.5), inset 0 -1px 1px hsl(var(--chrome-shadow) / 0.3), 0 2px 5px hsl(var(--chrome-shadow) / 0.2)',
        'chrome-hover': 'inset 0 1px 1px hsl(var(--chrome-highlight) / 0.6), inset 0 -1px 1px hsl(var(--chrome-shadow) / 0.4), 0 4px 10px hsl(var(--chrome-shadow) / 0.3)',
        'chrome-active': 'inset 0 1px 2px hsl(var(--chrome-shadow) / 0.5), 0 1px 2px hsl(var(--chrome-shadow) / 0.2)',
      }
		},
	},
	plugins: [require('tailwindcss-animate')],
};