import React from 'react';

interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}
interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
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
  const [drawerOptions, setDrawerOptions] = React.useState<IDrawerOption[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawerOpen = React.useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = React.useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  );
};
