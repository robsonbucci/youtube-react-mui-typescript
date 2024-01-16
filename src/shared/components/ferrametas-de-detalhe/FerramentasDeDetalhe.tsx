import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

export const FerramentasDeDetalhe = () => {
  const theme = useTheme();

  return (
    <>
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
        <Button
          color="primary"
          variant="contained"
          disableElevation
          startIcon={<Icon>save</Icon>}
        >
          Salvar
        </Button>

        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>save</Icon>}
        >
          Salvar e Voltar
        </Button>

        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>delete</Icon>}
        >
          Apagar
        </Button>

        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>add</Icon>}
        >
          Novo
        </Button>

        <Divider
          variant="middle"
          orientation="vertical"
        />

        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
        >
          Voltar
        </Button>
      </Box>
    </>
  );
};
