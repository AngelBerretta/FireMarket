/**
 * Tamaños predefinidos para iconos
 */
export const iconSizes = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48
}

/**
 * Stroke widths predefinidos
 */
export const strokeWidths = {
  thin: 1,
  normal: 1.5,
  medium: 2,
  bold: 2.5,
  heavy: 3
}

/**
 * Configuración por defecto para iconos
 */
export const iconDefaults = {
  size: iconSizes.md,
  strokeWidth: strokeWidths.medium,
  className: 'lucide-icon'
}

/**
 * Configuraciones específicas por contexto
 */
export const iconContexts = {
  logo: {
    size: iconSizes.xl,
    strokeWidth: strokeWidths.bold,
    className: 'lucide-icon-logo'
  },
  navigation: {
    size: iconSizes.md,
    strokeWidth: strokeWidths.medium,
    className: 'lucide-icon-nav'
  },
  button: {
    size: iconSizes.md,
    strokeWidth: strokeWidths.medium,
    className: 'lucide-icon-btn'
  },
  small: {
    size: iconSizes.sm,
    strokeWidth: strokeWidths.normal,
    className: 'lucide-icon-small'
  },
  large: {
    size: iconSizes.xl,
    strokeWidth: strokeWidths.normal,
    className: 'lucide-icon-large'
  }
}

/**
 * Colores temáticos para iconos
 */
export const iconColors = {
  primary: '#FF4500',
  secondary: '#4A90E2',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  neutral: '#6B7280'
}

/**
 * Utilidad para obtener props de icono según contexto
 * @param {string} context - Contexto del icono (logo, navigation, button, etc.)
 * @param {object} overrides - Props adicionales para sobrescribir
 * @returns {object} Props del icono
 */
export const getIconProps = (context = 'default', overrides = {}) => {
  const contextConfig = iconContexts[context] || iconDefaults
  return {
    ...contextConfig,
    ...overrides
  }
}

export default {
  sizes: iconSizes,
  strokeWidths,
  defaults: iconDefaults,
  contexts: iconContexts,
  colors: iconColors,
  getIconProps
}