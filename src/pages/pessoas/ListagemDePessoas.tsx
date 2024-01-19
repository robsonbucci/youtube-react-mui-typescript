import React from 'react';
import { useDebounce } from '../../shared/hooks';
import { useSearchParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDaListagem } from '../../shared/components';
import { IListagemPessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = React.useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const { debounce } = useDebounce();

  const busca = React.useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  React.useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(1, busca).then(result => {
        setIsLoading(false);

        if (result instanceof Error) return alert(result.message);
        setRows(result.data);
        setTotalCount(result.totalCount);
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
      {isLoading ? (
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ margin: 1, width: 'auto', display: 'flex', justifyContent: 'center' }}
        >
          <p>Carregando dados...</p>
        </TableContainer>
      ) : (
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ margin: 1, width: 'auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ações</TableCell>
                <TableCell>Nome Completo</TableCell>
                <TableCell>E-mail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>Ação</TableCell>
                  <TableCell>{row.nomeCompleto}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </LayoutBaseDePagina>
  );
};
