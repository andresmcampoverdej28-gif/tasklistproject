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

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  brawlstars: brawlStarsTheme,
  pvz: pvzTheme,
};

export type ThemeId = keyof typeof themes;