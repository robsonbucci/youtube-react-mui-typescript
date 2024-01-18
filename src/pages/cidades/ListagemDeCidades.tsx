import React from 'react';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDaListagem } from '../../shared/components';
import { useSearchParams } from 'react-router-dom';

export const ListagemDeCidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const busca = React.useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de Cidades"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoBotaoNovo="Nova"
          textoDaBusca={busca}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
        />
      }
    >
      <></>
    </LayoutBaseDePagina>
  );
};
