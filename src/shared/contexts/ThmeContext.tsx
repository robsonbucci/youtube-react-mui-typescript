import React from 'react';
import { DarkTheme, LightTheme } from './../themes';
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';

interface IThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}
const ThemeContext = React.createContext({} as IThemeContextData);

// hook customizado
export const useAppThemeContext = () => {
  // retornará IThemeContextData e alterna temas claro ou escuro
  return React.useContext(ThemeContext);
};

interface IThemeProviderProps {
  children: React.ReactNode;
}
export const AppThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = React.useState<'light' | 'dark'>('light');
  const toggleTheme = React.useCallback(() => {
    setThemeName(oldThemeName => (oldThemeName === 'light' ? 'dark' : 'light'));
  }, []);
  const theme = React.useMemo(() => {
    return themeName === 'light' ? LightTheme : DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
