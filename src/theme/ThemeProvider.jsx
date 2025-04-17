// import React, { createContext, useState, useEffect } from "react";
// import { useColorScheme } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { lightTheme, darkTheme } from "./themes";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const systemScheme = useColorScheme(); // 'light' or 'dark'
//   const [themeName, setThemeName] = useState(systemScheme);

//   useEffect(() => {
//     (async () => {
//       const savedTheme = await AsyncStorage.getItem("theme");
//       if (savedTheme === "light" || savedTheme === "dark") {
//         setThemeName(savedTheme);
//       } else {
//         setThemeName(systemScheme); // fallback to system theme
//       }
//     })();
//   }, [systemScheme]); // update if system theme changes

//   const toggleTheme = async () => {
//     const newTheme = themeName === "light" ? "dark" : "light";
//     setThemeName(newTheme);
//     await AsyncStorage.setItem("theme", newTheme);
//   };

//   const currentTheme = themeName === "light" ? lightTheme : darkTheme;

//   return (
//     <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, themeName }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export default ThemeContext;


import React, { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "./themes";

// ✅ Named export for ThemeContext
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme(); // 'light' or 'dark'
  const [themeName, setThemeName] = useState(systemScheme);

  useEffect(() => {
    (async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeName(savedTheme);
      } else {
        setThemeName(systemScheme); // fallback to system theme
      }
    })();
  }, [systemScheme]); // update if system theme changes

  const toggleTheme = async () => {
    const newTheme = themeName === "light" ? "dark" : "light";
    setThemeName(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  const currentTheme = themeName === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};
