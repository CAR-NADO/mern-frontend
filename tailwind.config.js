/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
      xxxl: "1920px",
    },
    extend: {
      fontSize: {
        xxs: "10px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        white: "#FFFFFE",
        gold: "#EAA64D",
        contrast: {
          DEFAULT: "#C3D5FF",
        },
        blue: {
          50: "#F4F7FE",
          100: "#EDF3FF",
          150: "#DAE9FF",
          200: "rgba(var(--color-blue), .2)",
          300: "rgba(var(--color-blue), .3)",
          500: "#0092ca80",
          600: "#6AD6FF",

          900: "#29C4FF",
          DEFAULT: "#0092CA",
        },
        black: {
          500: "rgba(var(--color-black), .5)",
          DEFAULT: "#1F1F1F",
        },
        grey: {
          200: "#EAEBED",
          400: "#B4B8BF",
          600: "#6F6F6F",
          800: "#88A9B6",
          DEFAULT: "#5E6D73",
        },
        red: {
          50: "#FFF5F4",
          DEFAULT: "#FF3B30",
        },
        orange: {
          DEFAULT: "#FFAA00",
          100: "#FFECDA",
          800: "#FF8512",
        },
        green: {
          DEFAULT: "#29A71A",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
