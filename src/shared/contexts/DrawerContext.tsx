import React from 'react';

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}
const DrawerContext = React.createContext({} as IDrawerContextData);

// hook customizado
export const useDrawerContext = () => {
  // retornará IDrawerContextData e alterna temas claro ou escuro
  return React.useContext(DrawerContext);
};

interface IDrawerProviderProps {
  children: React.ReactNode;
}
export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawerOpen = React.useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
