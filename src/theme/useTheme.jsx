// useTheme.js
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider"; // adjust path based on your folder structure

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
