import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useTranslation }  from "react-i18next";



const now = new Date();
const Page = () =>{
  const { i18n, t } = useTranslation();

  function clickMe (){
    i18n.changeLanguage("pl")
    window.location.reload();
  }
  return (
  <div>
    <Head>
      <title>
        {t("adminpagedesc")}
      </title>
    </Head>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
       {t("welcome-login-page")}  {t("welcome-login-page-title")} 
      </Container>
    </Box>
  </div>
);
            }
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);



export default Page;


// export async function getStaticProps(context) {
//   // extract the locale identifier from the URL
//   const { locale } = context

//   return {
//     props: {
//       // pass the translation props to the page component
//       ...(await serverSideTranslations(locale)),
//     },
//   }
// }
