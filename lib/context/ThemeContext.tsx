import { createContext } from "react";
import { ThemeContextType } from "../types/theme";
import { lightTheme } from "../constants/theme";

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: lightTheme,
  themeId: 'light',
  setTheme: () => {},
});