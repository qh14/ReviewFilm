import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();
const defaultTheme = "light";
const darkTheme = "dark";

export default function ThemeProvider({ children }) {
  const toggleTheme = () => {
    const oldTheme = getTheme();
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;
    updateTheme(newTheme, oldTheme);
  };

  useEffect(() => {
    const localTheme = getTheme();
    if (localTheme) {
      updateTheme(localTheme);
    } else {
      updateTheme(defaultTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getTheme = () => localStorage.getItem("theme");
  const updateTheme = (theme, themeToRemove) => {
    if (themeToRemove) {
      document.documentElement.classList.remove(themeToRemove);
    }
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  };
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
