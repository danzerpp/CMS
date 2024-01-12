import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography,MenuItem } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import {usert} from 'src/i18n'
import { useTranslation }  from "react-i18next";
import {
  MaterialReactTable,
  useMaterialReactTable,
  
} from 'material-react-table';
import { useRouter } from 'next/navigation';


const Page = () => {
  const [page, setPage] = useState(0);
  const {t} = useTranslation();
  const [usersData, setUsersData] = useState([]);
  const router = useRouter();

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  async function fetchApiData() {

    var options = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
      }
    }

    const URL = 'http://localhost:8080/api/admin/users'
     var response = await fetch(URL, options)
    var bodyData = await response.json()
    setUsersData(bodyData);
  };

  useEffect(() => {

    fetchApiData();
}, []);


function goToAddForm()
{
  router.push({
    pathname: '/forms/user/add',
    query: { userId: 1 }
}, '/forms/user/add')
    
  
}
  


  const columns = useMemo(
    () => [
      {
        accessorKey: 'fullName', //access nested data with dot notation
        header: t("user-name"),
        size: 150,
      },
      {
        accessorKey: 'username',
        header: t("user-email"),
        size: 150,
      }
      ,
      {
        accessorKey: 'role.name', //normal accessorKey
        header: t("user-rolename"),
        size: 200,
      }
    ],
    [],
  );


  const table = useMaterialReactTable({
   
    data:usersData,
    columns,  
     enableFullScreenToggle:false,
    enableDensityToggle:false,
    enableColumnDragging:false,
    enableHiding:false,
    localization: {
      actions: t("actions"),
      move: t("move"),
      edit: t("edit"),
      changeFilterMode: 'Alterar o modo de filtro',
      changeSearchMode: 'Alterar o modo de pesquisa',
      clearFilter: 'Limpar filtros',
      clearSearch: 'Limpar pesquisa',
      clearSort: 'Limpar classificações',
      clickToCopy: 'Clique para copiar',
      // ... and many more - see link below for full list of translation keys
    },
    enableRowActions: true,
   renderRowActionMenuItems: ({ row }) => [
    <MenuItem key="edit" onClick={() => {
    }
    }>
      {t("edit")}
    </MenuItem>,
    <MenuItem key="delete" onClick={async () => {
          var res = confirm(t("delete-confirm"))
            if(res)
          {
              var options = {  
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
                }
              }

              const URL = 'http://localhost:8080/api/admin/users/remove/'+ row.original.id
              var response = await fetch(URL, options)
              fetchApiData();
            }
    }
    }>
      {t("delete")}
    </MenuItem>
  ]
  });

  return (
    <>
      <Head>
        <title>
        {t("users")}
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
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  {t("users")}
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={goToAddForm}
                >
                   {t("add")}
                </Button>
              </div>
            </Stack>
            <MaterialReactTable table={table} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
