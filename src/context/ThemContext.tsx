import { createContext, useState } from "react";

const ThemContext = createContext({
  theme: "light",
  toggleMoode: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(window.localStorage.getItem("theme") || "light");

  const toggleMoode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    window.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <ThemContext.Provider value={{ theme, toggleMoode }}>
      {children}
    </ThemContext.Provider>
  );
};

export default ThemContext;