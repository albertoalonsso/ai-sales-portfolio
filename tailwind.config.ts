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
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors
				midnight: "#0D0D0D",
				gold: "#D4AF37",
				navy: "#1A2C56",
				lightGray: "#F5F5F7",
				turquoise: "#00CED1",
				'vivid-purple': "#D946EF",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ["Montserrat", "SF Pro Display", "Inter", "Helvetica", "Arial", "sans-serif"],
				mono: ["SF Mono", "JetBrains Mono", "monospace"],
			},
			fontSize: {
				"display": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
				"title": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
				"subtitle": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "500" }],
				"body-lg": ["1.125rem", { lineHeight: "1.5", fontWeight: "400" }],
				"body": ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
				"small": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
				"xs": ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }],
				"caption": ["0.6875rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.01em" }],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-from-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-in-from-left': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'blur-in': {
					'0%': { opacity: '0', filter: 'blur(8px)' },
					'100%': { opacity: '1', filter: 'blur(0)' }
				},
				'rotate-in': {
					'0%': { transform: 'rotate(-5deg)', opacity: '0' },
					'100%': { transform: 'rotate(0)', opacity: '1' }
				},
				'image-glow': {
					'0%': { 'box-shadow': '0 0 0 0 rgba(255, 255, 255, 0)' },
					'100%': { 'box-shadow': '0 0 30px 10px rgba(255, 255, 255, 0.2)' }
				},
				'shimmer': {
					'100%': { transform: 'translateX(100%)' }
				},
				'ticker': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out forwards',
				'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
				'slide-in-from-right': 'slide-in-from-right 0.7s ease-out forwards',
				'slide-in-from-left': 'slide-in-from-left 0.7s ease-out forwards',
				'blur-in': 'blur-in 0.7s ease-out forwards',
				'rotate-in': 'rotate-in 0.7s ease-out forwards',
				'image-glow': 'image-glow 1.5s ease-in-out infinite alternate',
				'ticker': 'ticker 30s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
