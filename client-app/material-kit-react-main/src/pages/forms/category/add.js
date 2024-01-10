import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfileDetails } from 'src/sections/forms/category/account-profile-details';
import { useTranslation }  from "react-i18next";
import { withRouter } from 'next/router'
import {
    Button,
  
  } from '@mui/material';
import { useRouter } from 'next/navigation';
const Page = (props) =>{
    const {t} = useTranslation();
    console.log(props.router.query.name);
    const router = useRouter();

    function goBackToPage()
    {
        router.push("/categories")
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
        {t("categories")} | {t("add")}
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
            {t("categories")}
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
                <AccountProfileDetails />
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
