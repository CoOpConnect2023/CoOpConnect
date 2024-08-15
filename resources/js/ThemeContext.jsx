import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const darkMode = useSelector(state => state.accessibility.darkMode);

    return (
        <ThemeContext.Provider value={{ darkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
