import React from 'react';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDaListagem } from '../../shared/components';
import { useSearchParams } from 'react-router-dom';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { useDebounce } from '../../shared/hooks';

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const busca = React.useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  React.useEffect(() => {
    debounce(() => {
      PessoasService.getAll(1, busca).then(result => {
        if (result instanceof Error) return alert(result.message);
        console.log(result.data[0]);
      });
    });
  }, [busca]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de pessoas"
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
