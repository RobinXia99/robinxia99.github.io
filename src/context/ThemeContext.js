import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const ThemeContext = createContext();

const COLORS = {
  dark: {
    bgPrimary: '#0a0a0a',
    bgSecondary: '#141414',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
    cursorBase: '#ffffff',
  },
  light: {
    bgPrimary: '#f5f5f5',
    bgSecondary: '#ffffff',
    textPrimary: '#111111',
    textSecondary: '#555555',
    cursorBase: '#000000',
  },
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('theme-mode') ?? 'dark');
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('accent-color') || '#4cc2d9');

  const applyTheme = useCallback((m, accent) => {
    const root = document.documentElement;
    const colors = COLORS[m];
    root.style.setProperty('--bg-primary', colors.bgPrimary);
    root.style.setProperty('--bg-secondary', colors.bgSecondary);
    root.style.setProperty('--text-primary', colors.textPrimary);
    root.style.setProperty('--text-secondary', colors.textSecondary);
    root.style.setProperty('--cursor-base', colors.cursorBase);
    root.style.setProperty('--accent', accent);
    const isLightAccent = ['#ffffff', '#fff', 'white'].includes(accent.toLowerCase());
    root.style.setProperty('--accent-contrast', isLightAccent ? '#000000' : '#ffffff');
    root.setAttribute('data-theme', m);
    // Dark: transparent so Three.js canvas shows through; Light: opaque bg
    root.style.backgroundColor = m === 'dark' ? 'transparent' : colors.bgPrimary;
    // Clear the inline anti-flash style on body
    document.body.style.background = '';
  }, []);

  useEffect(() => {
    applyTheme(mode, accentColor);
  }, [mode, accentColor, applyTheme]);

  const toggleMode = useCallback(() => {
    setMode(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme-mode', next);
      return next;
    });
    setAccentColor(prev => {
      if (prev === '#ffffff') {
        localStorage.setItem('accent-color', '#000000');
        return '#000000';
      }
      if (prev === '#000000') {
        localStorage.setItem('accent-color', '#ffffff');
        return '#ffffff';
      }
      return prev;
    });
  }, []);

  const updateAccentColor = useCallback((color) => {
    setAccentColor(color);
    localStorage.setItem('accent-color', color);
  }, []);

  const value = useMemo(() => ({ mode, accentColor, toggleMode, setAccentColor: updateAccentColor }), [mode, accentColor, toggleMode, updateAccentColor]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
