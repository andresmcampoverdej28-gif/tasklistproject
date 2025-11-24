import { useState } from "react"
import { darkTheme, lightTheme } from "../constants/theme";

export const useTheme = () => {
    const [isDark, setIsDark] = useState(false);
    const currentTheme = isDark ? darkTheme : lightTheme;
    const toggleTheme = () => {
        setIsDark(prevIsDark => !prevIsDark);
    };
    return {currentTheme, toggleTheme, isDark};
}