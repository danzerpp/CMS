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
  TextField
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useTranslation }  from "react-i18next";
import { useRouter } from 'next/navigation';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useCallback, useMemo, useState, useEffect } from 'react';

const categories = [
  {
    value: 1,
    label: 'aa'
  },
  {
    value: 2,
    label: 'bb'
  }
];


const Page = () => {

  const handleChange = useCallback(
    (event) => {
      setsbValue(event.target.value)
      fetchRecipes(event.target.value)
    },
    []
  );

  const [page, setPage] = useState(0);
  const {t} = useTranslation();
  const [data, setData] = useState([]);
  const [sbData, setsbData] = useState([]);
  const [sbValue, setsbValue] = useState(0);
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

  async function fetchCategories() {

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
    var resultList = bodyData.map(({ id, name }) => ({ value: id, label: name }));
    setsbData(resultList)
    setsbValue(resultList[0].value)
      fetchRecipes(resultList[0].value)
    setData(bodyData);
  };

  useEffect(() => {

    fetchCategories();
}, []);

async function fetchRecipes(categoryId)
{
  var options = {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
    }
  }

  const URL = 'http://localhost:8080/api/admin/recipes/'+categoryId
  var response = await fetch(URL, options)
  var bodyData = await response.json()
  bodyData.sort(compareDecimals )
  console.log(bodyData);
  setData(bodyData);
}




function goToAddForm()
{
  router.push({
    pathname: '/forms/recipe/add',
    query: { userId: 1 }
}, '/forms/recipe/add')
    
  
}
  


  const columns = useMemo(
    () => [
      {
        accessorKey: 'title', //access nested data with dot notation
        header: t("name"),
      },
      {
        accessorKey: 'isVisible', //access nested data with dot notation
        header: t("is-visible"),
        Cell: ({ cell }) => (
          <span>{cell.getValue() === 1 ? 'Tak': 'Nie'}</span>
        ),
      },
      {
        accessorKey: 'id',
        header: '',
        Cell: ({ cell }) => (
          <div>
              <Button>{t("edit")}</Button>
            <Button>{t("delete")}</Button>
          </div>
        
        ),
      }
    ],
    [],
  );


  const table = useMaterialReactTable({
   enableSorting:false,
   enableFilters:false,
   enableRowOrdering:true,
    data:data,
    columns,
  });

  return (
    <>
      <Head>
        <title>
        {t("recipes")}
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
                  {t("recipes")}
                </Typography>
              </Stack>
              <TextField
                  fullWidth
                  label= {t("recipes-select-category")}
                  name="role"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={sbValue}
                >
                  {sbData.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
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
