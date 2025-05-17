
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Verificar se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem("theme");
    
    // Verificar preferência do sistema
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Retornar tema salvo ou preferência do sistema
    return savedTheme || (prefersDark ? "dark" : "light");
  });

  useEffect(() => {
    // Atualizar a classe no elemento HTML
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Salvar no localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
};
