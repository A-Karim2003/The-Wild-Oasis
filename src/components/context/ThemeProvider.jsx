import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export default function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) ?? defaultTheme
  );

  // Handles checking theme mode: "light" | "dark" | "system"
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light", "dark");

    const resolvedTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    html.classList.add(resolvedTheme);
  }, [theme]);

  function changeTheme(newTheme) {
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
  }

  return <ThemeContext value={{ theme, changeTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
