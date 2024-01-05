import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';
import i18n from "i18next";

// TODO: Change subtitle text

export const Layout = (props) => {
  const { children } = props;
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
          {children}
      
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};