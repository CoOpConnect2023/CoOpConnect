import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const darkMode = useSelector(state => state.accessibility.darkMode);
    console.log('Dark Mode from Redux:', darkMode); // Log this to confirm Redux value
    const theme = darkMode ? darkTheme : lightTheme;
    console.log('Dark Mode from Redux:', theme);

    return (
      <ThemeContext.Provider value={{ darkMode, theme }}>
        {children}
      </ThemeContext.Provider>
    );
  };

export const useTheme = () => useContext(ThemeContext);
