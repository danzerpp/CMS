import { useCallback, useState,useEffect,useMemo } from 'react';

import { useTranslation }  from "react-i18next";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Head,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  TextareaAutosize,
  FormControlLabel,
  number,
  Checkbox,
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_EditActionButtons
 
} from 'material-react-table';
const states = [
  {
    value: 'ADMIN',
    label: 'ADMIN'
  },
  {
    value: 'USER',
    label: 'USER'
  }
];

export const RecipeProfileDetails = ({file,maxOrdinal}) => {
  const { i18n, t } = useTranslation();
  const [sbData, setsbData] = useState([]);
  const [sbValue, setsbValue] = useState(0);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products_list')));
  const [units, setUnits] = useState(JSON.parse(localStorage.getItem('units_list')));

  const [values, setValues] = useState({
    title: '',
    description: '',
    calories: 0,
    categoryId: 0,
    isVisible: true
  });

const [ingredients, setIngredients] = useState(
  [
    {
      productId:1,
      unitId:1,
      quantity:10
    },
    {
      productId:2,
      unitId:2,
      quantity:12
    }
  ]
)


 

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

    setValues((prevState) => ({
      ...prevState,
      ['categoryId']: resultList[0].value
    }));
  };

 


  useEffect(() => {
    fetchCategories();
  
}, []);

const columns = useMemo(
  () => [
    {
      accessorKey: 'productId', //access nested data with dot notation
      header: t("product-name"),
      editVariant: 'select',
      editSelectOptions: products.map(({ id, name }) => ({ value: id, label: name })),
      Cell:
      ({ cell }) => (
        <span>{products.find(f=>f.id == cell.getValue() ) === undefined ? '':products.find(f=>f.id == cell.getValue() ) .name }</span>
      )
    },
    {
      accessorKey: 'unitId', //access nested data with dot notation
      header: t("unit-name"),
      editVariant: 'select',
      editSelectOptions: units.map(({ id, name }) => ({ value: id, label: name })),
      Cell:
      ({ cell }) => (
        <span>{units.find(f=>f.id == cell.getValue() ) === undefined ? '':units.find(f=>f.id == cell.getValue() ) .name }</span>
      )
      
    },
    
    {
      accessorKey: 'quantity', //access nested data with dot notation
      header: t("quantity"),
    
    }
  ],
  [],
);


const table = useMaterialReactTable({
  enableSorting:false,
  enableFilters:false,
  enableRowOrdering:true,
  enableRowActions: true,
  enableEditing:true,
  
   data:ingredients,
   columns,localization: {
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
  }
   ,
   onEditingRowSave: ({ table, values }) => {
    //validate data
    //save data to api
    console.log(products)
    table.setEditingRow(null); //exit editing mode
  },
  onCreatingRowSave:  ({
    values,
    table,
  }) => {
    console.log(values)
    setIngredients([...ingredients,values]);
    table.setCreatingRow(null); //exit creating mode
  },
  
   renderRowActionMenuItems: ({ row }) => [
    <MenuItem key="delete" onClick={() => {
      var fitlered = ingredients.filter(i=>i !== row.original)
      console.log(fitlered)
      setIngredients(fitlered)
    }
    }>
      {t("delete")}
    </MenuItem>,
  ]
  ,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">{t("add")} {t("ingredients")}</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        {t("add")} {t("ingredients")}
      </Button>
    ),
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
         console.log(draggingRow)
         console.log(hoveredRow)

         ingredients.splice(hoveredRow.index,0,ingredients.splice(draggingRow.index, 1)[0],)
         setIngredients([...ingredients])
        }
      },
    }),

 });



 

  const handleChange = 
    (event) => {
      var val = event.target.value

      if(event.target.name == 'calories')
        val = parseInt(val);
      
      if(event.target.name == 'isVisible')
        val = event.target.checked;

      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: val
      }));
    }

  const handleSubmit = 
    async(event) => {
      event.preventDefault();
      console.log(file)
    
     

      var userData = JSON.parse(localStorage.getItem('authenticated_user'))

var recipeDto = {
  "categoryId": 1,
  "ordinalNr": 1,
  "title": "Spaghetti",
  "description": "Wloski makaron",
  "calories": "350",
  "actionUserId": 1,
  "isVisible": 1,
  "ingredients": [
      {
          "productId": 1,
          "unitId": 1,
          "quantity": 20,
          "ordinalNr": 1
      }
  ]
}
console.log(recipeDto)
      var url = 'http://localhost:8080/api/admin/recipes/add'
 
      var options = {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':  'Bearer ' + window.sessionStorage.getItem('token') 
        },
        body : JSON.stringify(recipeDto)
      }
  
      var response = await fetch(url,options);
      var resultBodyRecipe = await response.json();
      console.log('return body')
      console.log(resultBodyRecipe)





      const data = new FormData();
      data.append("recipeId", resultBodyRecipe.id);
      data.append("recipeImage", file);

      var urlUpload = 'http://localhost:8080/api/admin/recipes/uploadImage'
   
      var options = {  
        method: 'POST',
        headers: {
          'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
        },
        body : data
      }
  
      var response = await fetch(urlUpload,options);
      console.log(response)
    }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
      <img width={100} height={100}></img>
        
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label= {t("title")}
                  name="title"
                  onChange={handleChange}
                  required
                  value={values.title}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
               <TextField
                  fullWidth
                  label= {t("recipes-select-category")}
                  name="categoryId"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.categoryId}
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
              </Grid>
         
            
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label={t("calories")}
                  name="calories"
                  onChange={handleChange}
                  type='number'
                  InputProps={{ inputProps: { min: 1,step:1 } }}
                  required
                  value={values.calories}
                />
              </Grid>
             
              <Grid
                xs={12}
                md={6}
              >
                   <FormControlLabel control={
                
                <Checkbox
                  fullWidth
                  label={t("is-visible")}
                  name="isVisible"
                  onChange={handleChange} 
                  required
                  checked={values.isVisible}
                  value={values.isVisible}
                />

                }
                 label={t("is-visible")}/>
              </Grid>
              <Grid
                xs={12}
                md={12}
              >
               <TextField
                  fullWidth
                  label= {t("description")}
                  name="description"
                  onChange={handleChange}
                  required
                  multiline
  rows={2}
  maxRows={4}
  value={values.description}
                >
                  
                </TextField>
              </Grid>

              <Grid
                xs={12}
                md={12}
              >
                 <span className='ingredients-span'>{t("ingredients")}</span>
                         <MaterialReactTable table={table}  />
              </Grid>


            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained"
            type='submit'
          >
                        {t("save")}

          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
