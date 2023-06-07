import React, { useState, useEffect } from 'react';
import s from './Header.module.css'

export const ThemeSwitcher = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light');
    }
  }, []);

  const handleClick = () => {
    const html = document.documentElement;
    if (isLight) {
      html.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
    setIsLight(!isLight);
  }

  return (
    <div className={s.theme_switcher} onClick={handleClick}>
      {isLight
        ? <button className={s.btn_dark}> </button>
        : <button className={s.btn_light}> </button> 
      }
    </div>
  );
}
