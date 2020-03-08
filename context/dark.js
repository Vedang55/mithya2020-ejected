import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-community/async-storage';


export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('theme').then((val) => {
            if (val !== null) {
                setTheme(JSON.parse(val));
            }
        })
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('theme', JSON.stringify(theme));
    }, [theme])


    return (
        <ThemeContext.Provider
            value={
                [theme, setTheme]
            }
        >
            {children}
        </ThemeContext.Provider>
    );
};