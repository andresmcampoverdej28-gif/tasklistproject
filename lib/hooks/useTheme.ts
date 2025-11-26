// /lib/hooks/useTheme.ts
import { useState, useEffect } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, ThemeId } from "../constants/theme";

const THEME_STORAGE_KEY = '@app_theme';

export const useTheme = () => {
  const [themeId, setThemeId] = useState<ThemeId>('light');
  const currentTheme = themes[themeId];

  // Cargar el tema guardado al iniciar
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && savedTheme in themes) {
        setThemeId(savedTheme as ThemeId);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const setTheme = async (newThemeId: ThemeId) => {
    try {
      setThemeId(newThemeId);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeId);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return { currentTheme, themeId, setTheme };
};