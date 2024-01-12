import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  MenuItem
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useTranslation }  from "react-i18next";
import { useRouter } from 'next/navigation';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useCallback, useMemo, useState, useEffect } from 'react';

const Page = () => {
  const [page, setPage] = useState(0);
  const {t} = useTranslation();
  const [data, setData] = useState([]);
  const router = useRouter();

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  function compareDecimals(a, b) {
    if (a.ordinalNr === b.ordinalNr) 
         return 0;

    return a.ordinalNr - b.ordinalNr;
}

  async function fetchApiData() {

    var options = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
      }
    }

    const URL = 'http://localhost:8080/api/admin/categories'
     var response = await fetch(URL, options)
    var bodyData = await response.json()
    bodyData.sort(compareDecimals )
    console.log(bodyData);
    setData(bodyData);
  };

  useEffect(() => {

    fetchApiData();
}, []);


function goToAddForm()
{
  router.push({
    pathname: '/forms/category/add',
    query: { maxOrdinal: data.length == 0 ? 0 : data[data.length-1].ordinalNr +1 }
}, '/forms/category/add')
    
  
}
  


  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: t("name"),
      },
      {
        accessorKey: 'isVisible', //access nested data with dot notation
        header: t("is-visible"),
        Cell: ({ cell }) => (
          <span>{cell.getValue() === 1 ? 'Tak': 'Nie'}</span>
        ),
      }
    ],
    [],
  );


  const table = useMaterialReactTable({
   enableSorting:false,
   enableFilters:false,
   enableRowOrdering:true,
   
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: async () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {

         data.splice(hoveredRow.index,0,data.splice(draggingRow.index, 1)[0],)
      
        var fetchListBody = []
        for (let i = 0; i < data.length; i++) {
          const elem = data[i];
          fetchListBody.push({
            categoryId:elem.categoryId,
            ordinalNr: i
          })
        }

        var options = {  
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization':  'Bearer ' + window.localStorage.getItem('token') ,
          },
          body: JSON.stringify(
            fetchListBody
          )
      
        }
      
        var url = 'http://localhost:8080/api/admin/categories/changeOrder'
        var response = await fetch(url, options)

        fetchApiData();


        //  setIngredients([...ingredients])
        }
      },
    }),
      enableFullScreenToggle:false,
   enableDensityToggle:false,
   enableColumnDragging:false,
   enableHiding:false,
    data:data,
    columns,
    
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
        console.log(row)
          if(res)
        {
            var options = {  
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
              }
            }

            const URL = 'http://localhost:8080/api/admin/categories/remove/'+ row.original.categoryId
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
        {t("categories")}
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
                  {t("categories")}
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
            <MaterialReactTable table={table}  />
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
