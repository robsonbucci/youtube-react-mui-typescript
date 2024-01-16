import { Box, TextField, Button, Paper, useTheme, Icon } from '@mui/material';
import React from 'react';

interface IBarraDeFerramentasProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarBotaoNovo?: () => void;
}
export const BarraDeFerramentas: React.FC<IBarraDeFerramentasProps> = ({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  aoClicarBotaoNovo,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
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
      component={Paper}>
      {mostrarInputBusca && (
        <TextField
          size="small"
          value={textoDaBusca}
          placeholder="Perquisar..."
          onChange={({ target }) => aoMudarTextoDeBusca?.(target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            color="primary"
            variant="contained"
            onClick={aoClicarBotaoNovo}
            disableElevation
            endIcon={<Icon>add</Icon>}>
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
