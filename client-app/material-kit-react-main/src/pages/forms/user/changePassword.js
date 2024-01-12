import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { ChangePasswordDetails } from 'src/sections/account/change-profile-details.js';
import { useTranslation }  from "react-i18next";
import { withRouter } from 'next/router'
import {
    Button,
  
  } from '@mui/material';
import { useRouter } from 'next/navigation';
const Page = (props) =>{
    const {t} = useTranslation();
    console.log();
    console.log(props.router.query.userEmail);
    const router = useRouter();

    function goBackToPage()
    {
        router.push("/users")
    }

return(
  <>
  <Button
        fullWidth
        variant="text"
        maxWidth ="50px"
        onClick={goBackToPage}
      >
       {t("return")}
      </Button>
    <Head>
      <title>
        {t("users")} | {t("add")}
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
            {t("users")}
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <ChangePasswordDetails userId ={props.router.query.userId} email={props.router.query.userEmail} />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);
    }
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default withRouter (Page);
