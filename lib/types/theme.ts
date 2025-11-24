export type Theme = typeof import('../constants/theme').darkTheme;

export interface ThemeContextType {
    currentTheme: Theme | null;
    toggleTheme: () => void;
    isDark: boolean;
}