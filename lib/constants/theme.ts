export const lightTheme = {
  id: 'light',
  name: 'Claro',
  
  background: '#FFFFFF',
  surface: '#F5F5F5',

  primary: '#007AFF',
  secondary: '#5856D6',

  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',

  text: '#000000',
  textSecondary: '#666666',

  border: '#E0E0E0',
  divider: '#EEEEEE',

  tabBarBackground: '#FFFFFF',
  tabBarBorder: '#E5E5EA',

  cardBackground: '#FFFFFF',
  cardShadow: 'rgba(0, 0, 0, 0.1)',

  badgeColors: {
    blue: '#007AFF',
    red: '#FF3B30',
    orange: '#FF9500',
    green: '#34C759',
    purple: '#5856D6',
  }
};

export const darkTheme = {
  id: 'dark',
  name: 'Oscuro',

  background: '#000000',
  surface: '#1C1C1E',

  primary: '#0A84FF',
  secondary: '#5E5CE6',

  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',

  text: '#FFFFFF',
  textSecondary: '#98989D',

  border: '#38383A',
  divider: '#2C2C2E',

  tabBarBackground: '#000000',
  tabBarBorder: '#38383A',

  cardBackground: '#1C1C1E',
  cardShadow: 'rgba(0, 0, 0, 0.3)',

  badgeColors: {
    blue: '#0A84FF',
    red: '#FF453A',
    orange: '#FF9F0A',
    green: '#30D158',
    purple: '#5E5CE6',
  }
};

export const brawlStarsTheme = {
  id: 'brawlstars',
  name: 'Brawl Stars',

  background: '#1A0D3E',
  surface: '#2D1B5E',

  primary: '#FFC800',
  secondary: '#FF4D9C',

  success: '#00E874',
  warning: '#FF6B3D',
  error: '#D32F2F',

  text: '#FFFFFF',
  textSecondary: '#B8A8D9',

  border: '#4A3380',
  divider: '#3D2670',

  tabBarBackground: '#1A0D3E',
  tabBarBorder: '#4A3380',

  cardBackground: '#2D1B5E',
  cardShadow: 'rgba(255, 200, 0, 0.2)',

  badgeColors: {
    blue: '#00D9FF',
    red: '#FF4D9C',
    orange: '#FF6B3D',
    green: '#00E874',
    purple: '#9C27FF',
  }
};

export const pvzTheme = {
  id: 'pvz',
  name: 'Plants vs Zombies',

  background: '#87CEEB',
  surface: '#A8E6CF',

  primary: '#4CAF50',
  secondary: '#8BC34A',

  success: '#66BB6A',
  warning: '#FFA726',
  error: '#8B4513',

  text: '#2E4600',
  textSecondary: '#5D7D3A',

  border: '#7CB342',
  divider: '#9CCC65',

  tabBarBackground: '#A8E6CF',
  tabBarBorder: '#7CB342',

  cardBackground: '#FFFFFF',
  cardShadow: 'rgba(76, 175, 80, 0.2)',

  badgeColors: {
    blue: '#2196F3',
    red: '#8B4513',
    orange: '#FF9800',
    green: '#4CAF50',
    purple: '#9C27B0',
  }
};

export const sonicTheme = {
  id: 'sonic',
  name: 'Sonic The Hedgehog',

  background: '#1E3A8A', // Azul oscuro como la noche
  surface: '#3B82F6', // Azul Sonic

  primary: '#FF0000', // Rojo de los zapatos de Sonic
  secondary: '#FBBF24', // Amarillo de los anillos

  success: '#10B981', // Verde esmeralda
  warning: '#F59E0B', // Naranja de alerta
  error: '#EF4444', // Rojo de daño

  text: '#FFFFFF',
  textSecondary: '#BFDBFE',

  border: '#60A5FA',
  divider: '#3B82F6',

  tabBarBackground: '#1E3A8A',
  tabBarBorder: '#60A5FA',

  cardBackground: '#2563EB',
  cardShadow: 'rgba(255, 0, 0, 0.3)',

  badgeColors: {
    blue: '#3B82F6',
    red: '#FF0000',
    orange: '#F59E0B',
    green: '#10B981',
    purple: '#8B5CF6',
  }
};

export const fnfTheme = {
  id: 'fnf',
  name: 'Friday Night Funkin',

  background: '#1A1A2E', // Azul noche oscuro
  surface: '#16213E', // Azul medio

  primary: '#E94560', // Rosa rojizo (color de las flechas)
  secondary: '#0F3460', // Azul oscuro

  success: '#00E874', // Verde brillante (combo perfecto)
  warning: '#FFD166', // Amarillo (advertencia)
  error: '#EF476F', // Rosa fuerte (fallo)

  text: '#FFFFFF',
  textSecondary: '#B8B8D1',

  border: '#E94560', // Borde rosa
  divider: '#2D3748',

  tabBarBackground: '#1A1A2E',
  tabBarBorder: '#E94560',

  cardBackground: '#16213E',
  cardShadow: 'rgba(233, 69, 96, 0.3)',

  badgeColors: {
    blue: '#4CC9F0', // Azul cielo
    red: '#E94560', // Rosa rojizo
    orange: '#FF9E64', // Naranja
    green: '#00E874', // Verde brillante
    purple: '#7209B7', // Púrpura
  }
};

// Actualizar el objeto themes
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  brawlstars: brawlStarsTheme,
  pvz: pvzTheme,
  sonic: sonicTheme,
  fnf: fnfTheme, // ← Nuevo tema agregado
};

export type ThemeId = keyof typeof themes;