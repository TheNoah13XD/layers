/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    letterSpacing: {
      tightest: -3,
      normal: 0,
      wide: 0.15,
      wider: 0.25,
      widest: 0.5,
    },
    extend: {
      fontSize: {
        // label
        labelSmall: 11,
        labelMedium: 12,
        labelLarge: 14,
        // body
        bodySmall: 12,
        bodyMedium: 14,
        bodyLarge: 16,
        // title
        titleSmall: 14,
        titleMedium: 16,
        titleLarge: 22,
        // headline
        headlineSmall: 24,
        headlineMedium: 28,
        headlineLarge: 32,
        // display
        displaySmall: 36,
        displayMedium: 45,
        displayLarge: 57,
      },
      colors: {
        // primary
        primary: "#605690",
        onPrimary: "#FFFFFF",
        primaryContainer: "#E6DEFF",
        onPrimaryContainer: "#1C1149",
        primaryFixed: "#E6DEFF",
        onPrimaryFixed: "#1C1149",
        primaryFixedDim: "#CABEFF",
        onPrimaryFixedVariant: "#483F77",
        inversePrimary: "#CABEFF",
        // secondary
        secondary: "#1D6586",
        onSecondary: "#FFFFFF",
        secondaryContainer: "#C4E7FF",
        onSecondaryContainer: "#001E2C",
        secondaryFixed: "#C4E7FF",
        onSecondaryFixed: "#001E2C",
        secondaryFixedDim: "#90CEF4",
        onSecondaryFixedVariant: "#004C69",
        // tertiary
        tertiary: "#8C4E28",
        onTertiary: "#FFFFFF",
        tertiaryContainer: "#FFDBC9",
        onTertiaryContainer: "#331200",
        tertiaryFixed: "#FFDBC9",
        onTertiaryFixed: "#331200",
        tertiaryFixedDim: "#FFB68D",
        onTertiaryFixedVariant: "#6F3813",
        // error
        error: "#8F4A4F",
        onError: "#FFFFFF",
        errorContainer: "#FFDADA",
        onErrorContainer: "#3B0810",
        // surface
        surface: "#FDF8FF",
        onSurface: "#1C1B20",
        surfaceVariant: "#E6E0EC",
        onSurfaceVariant: "#48454E",
        surfaceDim: "#DDD8E0",
        surfaceBright: "#FDF8FF",
        surfaceContainerLowest: "#FFFFFF",
        surfaceContainerLow: "#F7F2FA",
        surfaceContainer: "#F1ECF4",
        surfaceContainerHigh: "#EBE6EE",
        surfaceContainerHighest: "#E6E1E9",
        inverseSurface: "#312F36",
        inverseOnSurface: "#F4EFF7",
        // background
        background: "#FDF8FF",
        onBackground: "#1C1B20",
        outline: "#79757F",
        outlineVariant: "#C9C4D0",
        shadow: "#000000",
        scrim: "#000000",
      }
    },
  },
  plugins: [],
}
