import React from 'react';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDaListagem } from '../../shared/components';
import { IListagemPessoa, PessoasService } from '../../shared/services/api/pessoas/PessoasService';

import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';

export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = React.useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const { debounce } = useDebounce();

  const navegate = useNavigate();

  const busca = React.useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = React.useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  const handleDelete = (id: number) => {
    if (confirm('Realmmente deseja apagar um registro?')) {
      PessoasService.deleteById(id).then(result => {
        if (result instanceof Error) return alert(result.message);
        return setRows(oldRows => [...oldRows.filter(oldRow => oldRow.id !== id)]);
      });
    }
  };

  React.useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(pagina, busca).then(result => {
        setIsLoading(false);

        if (result instanceof Error) return alert(result.message);

        setRows(result.data);
        setTotalCount(result.totalCount);
      });
    });
  }, [busca, pagina]);

  return (
    <LayoutBaseDePagina
      titulo="Listagem de pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo="Nova"
          aoClicarBotaoNovo={() => navegate('/pessoas/detalhe/nova')}
          aoMudarTextoDeBusca={texto =>
            setSearchParams({ busca: texto, pagina: '1' }, { replace: true })
          }
        />
      }
    >
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
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(row.id)}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => navegate(`/pessoas/detalhe/${row.id}`)}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && <caption>{Environment.LISTAGEM_VAZIA}</caption>}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        {
                          busca,
                          pagina: newPage.toString(),
                        },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
