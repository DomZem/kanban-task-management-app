import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  const toggleMode = () => setTheme(colorTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // save theme to local storage
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return toggleMode;
};

export default useDarkMode;
