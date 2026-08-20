// DigitallyDefined — unified Soft Brutalism design tokens
// Single source of truth for the online-local site theme.
// Mirrored in: digitallydefined-dashboard/src/theme.js

export const tokens = {
  palette: {
    background: "#FFFCF9", // cream
    card: "#FFFFFF", // white surface
    panel: "#FFFAF5", // warm white
    textPrimary: "#111111", // near-black
    textInk: "#111111",
    textMuted: "#5F5F5F",
    orange: "#F18B25", // primary accent / CTA
    aqua: "#47B7D4", // secondary / info
    red: "#8B1A0A", // alerts only
    success: "#16A34A",
    gold: "#EAB308",
  },

  type: {
    heading: "Inter",
    body: "DM Sans",
    weight: 800,
    headingSpacing: "-0.03em",
    eyebrowSpace: "0.12em",
    bodyLineHeight: "1.6",
  },

  spacing: {
    xs: "8px",
    sm: "16px",
    md: "24px",
    lg: "40px",
    xl: "60px",
    gridGap: "32px",
    container: "1100px",
  },

  geometry: {
    width: "1px",
    color: "#111111",
    radius: "0px", // Brutalism: never rounded
  },

  shadow: {
    card: "1px 1px 0px rgba(0, 0, 0, 0.08)", // brutalist subtle depth
    hover: "2px 2px 0px rgba(0, 0, 0, 0.12)",
    elevated: "3px 3px 0px rgba(0, 0, 0, 0.15)",
    none: "none",
  },

  // Flat, geometric, brutalist visual language
  icon: { style: "flat-line-geometric", stroke: "1.5px" },
  illustration: { style: "flat-abstract", radius: "0px", figures: "none" },

  rules: [
    "no silhouettes",
    "no human forms",
    "no gradients",
    "no rounded corners",
    "no non-brand fonts",
    "no off-palette colors",
    "no non-brutalist shadows",
  ],
};

export const theme = {
  fonts: {
    heading: `'${tokens.type.heading}', system-ui, sans-serif`,
    body: `'${tokens.type.body}', system-ui, sans-serif`,
    app: `'${tokens.type.heading}', '${tokens.type.body}', system-ui, sans-serif`,
  },
  colors: {
    background: tokens.palette.background,
    card: tokens.palette.card,
    panel: tokens.palette.panel,
    textPrimary: tokens.palette.textPrimary,
    textMuted: tokens.palette.textMuted,
    border: tokens.geometry.color,
    orange: tokens.palette.orange,
    aqua: tokens.palette.aqua,
    red: tokens.palette.red,
    success: tokens.palette.success,
    gold: tokens.palette.gold,
    accent: tokens.palette.orange,
  },
  geometry: tokens.geometry,
  shadows: tokens.shadow,
  spacing: tokens.spacing,
  layout: tokens.spacing,
};

// --- Computed primitives -------------------------------------------
export const brutalBorder = `${theme.geometry.width} solid ${theme.geometry.color}`;

export const brutalCard = {
  border: brutalBorder,
  borderRadius: 0,
  boxShadow: theme.shadows.card,
  backgroundColor: theme.colors.card,
};

export const brutalHeading = {
  fontFamily: theme.fonts.heading,
  fontWeight: tokens.type.weight,
  fontStyle: "normal",
  textTransform: "none",
  letterSpacing: tokens.type.headingSpacing,
  color: theme.colors.textPrimary,
};

export const brutalEyebrow = {
  fontFamily: theme.fonts.heading,
  fontSize: "0.72rem",
  fontWeight: 800,
  letterSpacing: tokens.type.eyebrow,
  textTransform: "uppercase",
  margin: 0,
  color: theme.colors.textPrimary,
};

export const brutalButtonBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  padding: "14px 20px",
  border: brutalBorder,
  borderRadius: 0,
  boxShadow: theme.shadows.none,
  textDecoration: "none",
  textTransform: "none",
  letterSpacing: "-0.01em",
  fontWeight: 700,
  fontSize: "0.85rem",
  cursor: "pointer",
  fontFamily: theme.fonts.body,
};

export const brutalButtonPrimary = {
  ...brutalButtonBase,
  backgroundColor: theme.colors.orange,
  color: theme.colors.textPrimary,
};

export const brutalButtonSecondary = {
  ...brutalButtonBase,
  backgroundColor: theme.colors.aqua,
  color: theme.colors.textPrimary,
};

export const brutalButtonOutline = {
  ...brutalButtonBase,
  backgroundColor: theme.colors.background,
  color: theme.colors.textPrimary,
};

export default theme;