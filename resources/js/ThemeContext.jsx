import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const darkMode = useSelector(state => state.accessibility.darkMode);

    const theme = darkMode ? darkTheme : lightTheme;
   

    return (
      <ThemeContext.Provider value={{ darkMode, theme }}>
        {children}
      </ThemeContext.Provider>
    );
  };

export const useTheme = () => useContext(ThemeContext);
