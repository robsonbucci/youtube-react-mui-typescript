import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard, ListagemDeCidades } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  React.useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: 'pagina-inicial',
        label: 'Página Inicial',
      },
      {
        icon: 'holiday_village',
        path: '/cidades',
        label: 'Cidades',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/cidades" element={<ListagemDeCidades />} />
      {/* <Route path="/cidades/detalhe/:id" element={<ListagemDeCidades />} /> */}

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
