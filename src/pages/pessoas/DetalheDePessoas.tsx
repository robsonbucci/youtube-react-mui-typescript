import React from 'react';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { VTextField } from '../../shared/forms';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [nome, setNome] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id)).then(result => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate('/pessoas');
        } else {
          setNome(result.nomeCompleto);

          formRef.current?.setData(result);
        }
      });
    }
  }, [id]);

  const formRef = React.useRef<FormHandles>(null);

  const handleSalvar = (dados: IFormData) => {
    setIsLoading(true);
    if (id === 'nova') {
      PessoasService.create(dados).then(result => {
        setIsLoading(false);

        if (result instanceof Error) return alert(result.message);
        return navigate(`/pessoas/detalhe/${result}`);
      });
    } else {
      PessoasService.updateById(Number(id), { id: Number(id), ...dados }).then(result => {
        setIsLoading(false);
        if (result instanceof Error) return alert(result.message);

      });
    }
  };

  const handleDeletar = (id: number) => {
    if (confirm('Realmmente deseja apagar um registro?')) {
      PessoasService.deleteById(id).then(result => {
        if (result instanceof Error) return alert(result.message);
        alert('Registro deletado com sucesso!');
        navigate('/pessoas');
      });
    }
  };
  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova Pessoa' : `Editar - ${nome}`}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmApagar={() => handleDeletar(Number(id))}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
        />
      }
    >
      <Form ref={formRef} onSubmit={dados => handleSalvar(dados)} placeholder="Altere o nome">
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading &&
              <Grid item >
                <LinearProgress variant="indeterminate" />
              </Grid>
            }

            <Grid item >
              <Typography variant='h6' >Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label="Nome Completo"
                  name="nomeCompleto"
                  disabled={isLoading}
                  onChange={({ target }) => setNome(target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label="Cidade ID"
                  name="cidadeId"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </Form>
    </LayoutBaseDePagina>
  );
};
