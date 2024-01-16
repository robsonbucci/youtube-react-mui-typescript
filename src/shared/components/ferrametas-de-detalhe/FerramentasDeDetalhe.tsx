import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';
import React from 'react';

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {mostrarBotaoSalvar && (
        <Button
          color="primary"
          variant="contained"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmNovo}
        >
          Salvar
        </Button>
      )}

      {mostrarBotaoSalvarEFechar && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmVoltar}
        >
          Salvar e Voltar
        </Button>
      )}

      {mostrarBotaoApagar && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={aoClicarEmApagar}
        >
          Apagar
        </Button>
      )}

      {mostrarBotaoNovo && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={aoClicarEmSalvar}
        >
          {textoBotaoNovo}
        </Button>
      )}

      <Divider
        variant="middle"
        orientation="vertical"
      />

      {mostrarBotaoVoltar && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoClicarEmSalvarEFechar}
        >
          Voltar
        </Button>
      )}
    </Box>
  );
};
