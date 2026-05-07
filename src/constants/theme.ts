// KOORAZONE FOOT - Design System & Theme
export const COLORS = {
  // Primary palette - Football green
  primary: '#205A28',
  primaryLight: '#2E7D32',
  primaryDark: '#1B4D22',
  
  // Secondary palette - Red accent
  secondary: '#C72B32',
  secondaryLight: '#D32F2F',
  secondaryDark: '#A92329',
  
  // Accent colors
  accent: '#FF9800',
  highlight: '#FFC107',
  gold: '#FFD700',
  
  // Background
  bgDark: '#0A0E0F',
  bgCard: '#121A14',
  bgCardLight: '#1A2B1E',
  bgGlass: 'rgba(32, 90, 40, 0.15)',
  bgGlassBorder: 'rgba(255, 255, 255, 0.08)',
  
  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#B0BEC5',
  textMuted: '#78909C',
  textAccent: '#4CAF50',
  
  // Status
  live: '#FF1744',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  
  // Gradients (used as array for LinearGradient)
  gradientPrimary: ['#205A28', '#2E7D32'] as const,
  gradientSecondary: ['#C72B32', '#D32F2F'] as const,
  gradientDark: ['#0A0E0F', '#121A14'] as const,
  gradientHero: ['rgba(32, 90, 40, 0.9)', 'rgba(10, 14, 15, 0.95)'] as const,
  gradientCard: ['rgba(26, 43, 30, 0.8)', 'rgba(18, 26, 20, 0.95)'] as const,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    hero: 32,
    display: 42,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 40,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 50,
};

export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  glow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
};
