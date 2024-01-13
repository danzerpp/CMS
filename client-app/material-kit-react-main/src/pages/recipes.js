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
  TextField,
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
    var resultList = bodyData.map(({ categoryId, name }) => ({ value: categoryId, label: name }));
    setsbData(resultList)
    console.log('result here')
    console.log(resultList)
    if(resultList.length >0)
    {
      var usedCategory = localStorage.getItem('last_used_category')
      console.log('usedCategory')
      console.log(usedCategory)
      if(usedCategory !== undefined && usedCategory !== null)
      {
      
          var value = resultList.find(f=>f.value === parseInt(usedCategory))
          console.log(resultList)
          console.log(value)
          if(value !== undefined)
        {
          console.log('setsbValue')
          console.log(value)
          setsbValue(parseInt(usedCategory))
          fetchRecipes(parseInt(usedCategory))
          return;
        }
      }
      setsbValue(resultList[0].value)
      fetchRecipes(resultList[0].value)
    }
   
    setData(bodyData);
  };

  async function fetchProducts() {

    var options = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
      }
    }

    const URL = 'http://localhost:8080/api/admin/products'
     var response = await fetch(URL, options)
    var bodyData = await response.json();
    localStorage.setItem('products_list',JSON.stringify(bodyData))

    
  };

  async function fetchUnits() {

    var options = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
      }
    }

    const URL = 'http://localhost:8080/api/admin/units'
     var response = await fetch(URL, options)
    var bodyData = await response.json()
   localStorage.setItem('units_list',JSON.stringify(bodyData))
  };

  


  useEffect(() => {

    fetchCategories();
    fetchProducts();
    fetchUnits();
}, []);

async function fetchRecipes(categoryId)
{
  var options = {  
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':  'Bearer ' + window.localStorage.getItem('token') ,
    },
    body: JSON.stringify(
      {
        title: "",
        'categoryId':categoryId
      }
    )

  }

  const URL = 'http://localhost:8080/api/admin/recipes'
  var response = await fetch(URL, options)
  console.log(response)
  var bodyData = await response.json()
  bodyData.sort(compareDecimals )
  console.log(bodyData);
  setData(bodyData);
  //  setimgBase(bodyData[2].image)
}




function goToAddForm()
{
  if(sbValue ===0 )
    return;
    localStorage.setItem('last_used_category',sbValue)
    console.log(sbValue);
  router.push({
    pathname: '/forms/recipe/add',
    query: { maxOrdinal: data.length == 0 ? 0: data[data.length-1].ordinalNr,
            categoryId: sbValue
     }
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
         console.log(draggingRow)
         console.log(hoveredRow)

         data.splice(hoveredRow.index,0,data.splice(draggingRow.index, 1)[0],)
         console.log(data)
      
        var fetchData = []
        for (let i = 0; i < data.length; i++) {
          const elem = data[i];
          fetchData.push({
            recipeId:elem.recipeId,
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
            fetchData
          )
      
        }
      
        var url = 'http://localhost:8080/api/admin/recipes/changeOrder'
        var response = await fetch(url, options)
        console.log(response);

        fetchRecipes(sbValue)


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
    },
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem key="edit" onClick={() => {
        localStorage.setItem('last_used_category',row.original.categoryId)
      router.push({
        pathname: '/forms/recipe/add',
        query: { maxOrdinal: data.length == 0 ? 0: data[data.length-1].ordinalNr,
                categoryId: row.original.categoryId,
                recipeId: row.original.recipeId
         }
    }, '/forms/recipe/add')
        
      }
      }>
        {t("edit")}
      </MenuItem>,
      <MenuItem key="delete" onClick={async () => {
        var res = confirm(t("delete-confirm"))
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

            const URL = 'http://localhost:8080/api/admin/recipes/remove/'+ row.original.recipeId
            var response = await fetch(URL, options)
            fetchRecipes(sbValue);
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
