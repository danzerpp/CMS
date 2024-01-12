import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { RecipeProfile } from 'src/sections/forms/recipe/recipe-profile';
import { RecipeProfileDetails } from 'src/sections/forms/recipe/recipe-profile-details';
import { useTranslation }  from "react-i18next";
import { withRouter } from 'next/router'
import {
    Button,
  
  } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const Page = (props) =>{
    const {t} = useTranslation();
    console.log(props.router.query.maxOrdinal);
    const router = useRouter();

    const [file, setFile] = useState();


    function setFormImage(image){
      console.log('funny if it works')
      console.log(image);
      setFile(image);
      console.log('funny if it works')
      console.log(file)
      console.log('funny if it works')
    }

    function goBackToPage()
    {
        router.push("/recipes")
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
        {t("recipes")} | {t("add")}
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
            {t("recipes")}
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
                lg={4}
              >
                <RecipeProfile
                 handleUpload = {setFormImage} />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <RecipeProfileDetails
                file = {file} maxOrdinal = {props.router.query.maxOrdinal}
                />
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
