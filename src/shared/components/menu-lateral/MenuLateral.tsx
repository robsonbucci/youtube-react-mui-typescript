import { Avatar, Box, Divider, Drawer, Icon, useMediaQuery, useTheme } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { useDrawerContext } from '../../contexts';

const IMG_PERFIL =
  'https://yt3.ggpht.com/X1OZQTM4R76JXkWy12eBXSKd6-uxBDAqndKAjzgJNFdZznvIj-SXIkl8TdpVIAqxl2Cn3MhpaA=s88-c-k-c0x00ffffff-no-rj';

interface IMenuLateralProps {
  children: React.ReactNode;
}
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  // para saber se a tela é menor do que sm (600px)
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <Avatar
              sx={{
                height: theme.spacing(12),
                width: theme.spacing(12),
              }}
              src={IMG_PERFIL}
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Página Inicial" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
