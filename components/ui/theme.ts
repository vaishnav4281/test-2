import { createTheme } from "../../lib/create-theme"

export const theme = createTheme({
  colors: {
    primary: {
      DEFAULT: "#4F46E5",
      foreground: "#FFFFFF",
      "50": "#EEF2FF",
      "100": "#E0E7FF",
      "200": "#C7D2FE",
      "300": "#A5B4FC",
      "400": "#818CF8",
      "500": "#6366F1",
      "600": "#4F46E5",
      "700": "#4338CA",
      "800": "#3730A3",
      "900": "#312E81",
      "950": "#1E1B4B"
    },
    background: {
      DEFAULT: "#FFFFFF",
      foreground: "#0F172A",
      muted: "#475569",
      accent: "#4F46E5",
      card: "#FFFFFF",
      border: "#E2E8F0",
      hover: "#F1F5F9"
    }
  }
}) 