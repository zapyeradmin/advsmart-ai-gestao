
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#3b82f6',
					hover: '#2563eb',
					foreground: '#ffffff'
				},
				secondary: {
					DEFAULT: '#1e293b',
					hover: '#334155',
					foreground: '#f1f5f9'
				},
				destructive: {
					DEFAULT: '#ef4444',
					hover: '#dc2626',
					foreground: '#ffffff'
				},
				success: {
					DEFAULT: '#10b981',
					hover: '#059669',
					foreground: '#ffffff'
				},
				warning: {
					DEFAULT: '#f59e0b',
					hover: '#d97706',
					foreground: '#ffffff'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Modern Dark theme colors
				dark: {
					bg: '#0f0f23',
					surface: '#1a1a2e',
					card: '#16213e',
					sidebar: '#0e1629',
					text: '#f8fafc',
					'text-secondary': '#cbd5e1',
					'text-muted': '#64748b',
					border: '#2d3748',
					'border-light': '#374151',
					accent: '#6366f1',
					'accent-hover': '#4f46e5'
				},
				// Status colors with better contrast
				status: {
					'green': '#22c55e',
					'green-bg': '#dcfce7',
					'blue': '#3b82f6',
					'blue-bg': '#dbeafe',
					'yellow': '#eab308',
					'yellow-bg': '#fef3c7',
					'red': '#ef4444',
					'red-bg': '#fee2e2',
					'purple': '#a855f7',
					'purple-bg': '#f3e8ff',
					'orange': '#f97316',
					'orange-bg': '#fed7aa'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				button: '12px'
			},
			fontFamily: {
				inter: ['Inter', 'system-ui', 'sans-serif'],
				pacifico: ['Pacifico', 'cursive'],
				mono: ['JetBrains Mono', 'Fira Code', 'monospace']
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-up': 'slide-up 0.3s ease-out'
			},
			boxShadow: {
				'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
