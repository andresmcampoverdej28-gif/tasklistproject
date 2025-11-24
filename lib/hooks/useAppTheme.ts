import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { ThemeContextType } from '../types/theme';

export const useAppTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useAppTheme debe ser usado dentro de un ThemeProvider');
    }
    return context;
};