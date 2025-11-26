// /lib/providers/ThemeProvider.tsx
import React from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useTheme } from '../hooks/useTheme'; // Cambia esta importación

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeData = useTheme(); // Usa el hook useTheme directamente

  return (
    <ThemeContext.Provider value={themeData}>
      {children}
    </ThemeContext.Provider>
  );
};