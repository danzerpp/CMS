import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Button, Avatar,Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';
import i18n from "i18next";



// TODO: Change subtitle text

export const Layout = (props) => {
  const { children } = props;
  const logo = require('/src/flag.png'); // with require
  var language = localStorage.getItem('app_language');
  if( language === undefined)
    language ='pl';

  function changeLanguage(){
    var language = localStorage.getItem('app_language')
    if(language === undefined || !language)
    {
      localStorage.setItem('app_language','en')
    }
    else 
    {
      localStorage.setItem('app_language',language === 'pl' ? 'en': 'pl')

    }
    window.location.reload();
  }

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32
              }}
            >
              <Logo />
            </Box>

              <div className='changeLanguageBtn'>
                
                <Button
                onClick={changeLanguage}
                startIcon = {<Avatar src={language === 'pl' ? '/images/united-kingdom.png' : '/images/flag.png'} width={25} height={25} />}
                >

                </Button>
              </div>

          </Box>
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: '24px',
                lineHeight: '32px',
                mb: 1
              }}
              variant="h1"
            >
             {i18n.t("welcome-login-page")} {' '}
              <Box
                component="a"
                sx={{ color: '#15B79E' }}
                target="_blank"
              >
                {i18n.t("welcome-login-page-title")}
              </Box>
            </Typography>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="subtitle1"
            >
              {i18n.t("welcome-login-page-desc")}
            </Typography>
            
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};