import type { Config } from 'tailwindcss'

/**
 * Two token sets live here on purpose:
 *
 *  - `pix.*` / `font-pixel` / `font-screen` — the retro pixel-art design system
 *    used by the entire public site.
 *  - the legacy dark tokens (`background`, `surface`, `accent`, `text.*`) — still
 *    used by the /admin CMS, which deliberately stays a dense dark tool UI.
 *
 * Keeping both means the redesign is a new UI layer, not a rewrite of the app.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── pixel design system ───────────────────────────── */
        pix: {
          paper: '#FDF4E0',
          'paper-deep': '#F7EACB',
          'paper-edge': '#EFDDB6',
          panel: '#FFFDF7',
          'panel-alt': '#FBF3E2',
          ink: '#1C1A20',
          'ink-soft': '#4A4552',
          'ink-mute': '#7A7384',
          red: '#EC3B43',
          'red-dark': '#C2262D',
          'red-deep': '#9E1C22',
          'red-light': '#FF6B70',
          sky: '#CFE3F7',
          'sky-mid': '#A9C9EC',
          'sky-deep': '#7FA8DA',
          chip: '#EDF1FB',
          'chip-line': '#BFCDE9',
          chipwarm: '#FBEBD6',
          grass: '#7FCA55',
          'grass-mid': '#55A83A',
          'grass-dark': '#3A7F2A',
          'grass-deep': '#265E1D',
          wood: '#D9B078',
          'wood-mid': '#B98A50',
          'wood-dark': '#8B633A',
          'wood-deep': '#68482A',
          stone: '#C8C3BC',
          'stone-mid': '#A59F98',
          'stone-dark': '#807A72',
          shadow: 'rgba(28, 26, 32, 0.20)',
          'shadow-hard': 'rgba(28, 26, 32, 0.32)',
        },

        /* ── legacy dark tokens (admin CMS) ────────────────── */
        background: '#080a09',
        surface: '#0d100e',
        'surface-light': '#121512',
        'surface-lighter': '#181b17',
        text: {
          primary: '#e8e5d8',
          secondary: '#a8a89b',
          muted: '#66695f',
        },
        accent: {
          DEFAULT: '#b8bd72',
          light: '#c9ce88',
          dark: '#747a43',
        },
        border: {
          DEFAULT: 'rgba(184, 189, 114, 0.22)',
          subtle: 'rgba(232, 229, 216, 0.10)',
        },
        danger: '#c17a5f',
      },

      fontFamily: {
        /* Press Start 2P — window chrome, nav tabs, labels, buttons. Tiny sizes only. */
        pixel: ['"Press Start 2P"', '"Courier New"', 'monospace'],
        /* Silkscreen — big pixel headlines. Reads far better than Press Start 2P large. */
        screen: ['Silkscreen', '"Press Start 2P"', 'monospace'],
        /* Heavy grotesk — the "Kabin //" wordmark and section titles. */
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        /* Inter — all long-form reading copy. Legibility beats novelty for paragraphs. */
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },

      letterSpacing: {
        pixel: '0.06em',
        'pixel-wide': '0.14em',
      },

      backgroundImage: {
        grid:
          'linear-gradient(rgba(232,229,216,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(232,229,216,0.035) 1px, transparent 1px)',
        /* faint 4px dot lattice — reads as pixel graph paper */
        'pix-dots':
          'radial-gradient(rgba(28,26,32,0.055) 1px, transparent 1px)',
        'pix-checks':
          'linear-gradient(45deg, rgba(28,26,32,0.04) 25%, transparent 25%, transparent 75%, rgba(28,26,32,0.04) 75%)',
      },
      backgroundSize: {
        grid: '48px 48px',
        dots: '16px 16px',
        checks: '12px 12px',
      },

      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        /* Motion is stepped, never smooth — smooth easing breaks the pixel illusion. */
        pixHover: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(0, -4px)' },
        },
        pixBob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        pixBobSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        pixDrift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(100% + 100vw))' },
        },
        pixPop: {
          '0%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.14)' },
          '100%': { transform: 'scale(1)' },
        },
        pixTail: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-9deg)' },
        },
        pixZ: {
          '0%': { opacity: '0', transform: 'translate(0, 0) scale(0.7)' },
          '30%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translate(6px, -14px) scale(1.1)' },
        },
        pixSparkle: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        fadeUp: 'fadeUp 0.5s ease-out both',
        marquee: 'marquee 28s linear infinite',
        caret: 'blink 1.05s step-end infinite',
        'pix-bob': 'pixBob 2.6s steps(3, end) infinite',
        'pix-bob-slow': 'pixBobSlow 4s steps(2, end) infinite',
        'pix-pop': 'pixPop 0.4s steps(4, end)',
        'pix-tail': 'pixTail 1.8s steps(2, end) infinite',
        'pix-z': 'pixZ 2.4s steps(4, end) infinite',
        'pix-sparkle': 'pixSparkle 1.6s steps(2, end) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
