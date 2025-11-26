import { ThemeId } from '../constants/theme';

export type Theme = typeof import('../constants/theme').lightTheme;

export interface ThemeContextType {
  currentTheme: Theme;  // SIN "| null"
  themeId: ThemeId;
  setTheme: (themeId: ThemeId) => void;
}