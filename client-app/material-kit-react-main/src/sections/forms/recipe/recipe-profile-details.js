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
import { Router } from 'next/router';

import { useRouter } from 'next/navigation';

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

export const RecipeProfileDetails = ({file,maxOrdinal,currCatId, parentProps}) => {
  const { i18n, t } = useTranslation();
  const [sbData, setsbData] = useState([]);
  const [sbValue, setsbValue] = useState(0);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products_list')));
  const [units, setUnits] = useState(JSON.parse(localStorage.getItem('units_list')));
  const router = useRouter();

  const [values, setValues] = useState({
    title: '',
    description: '',
    calories: 1,
    categoryId: 0,
    isVisible: true
  });

const [ingredients, setIngredients] = useState(
  [
   
  ]
)




async function fetchRecipe() {
  console.log('haha')
  console.log(parentProps.router.query.recipeId)
  if(parentProps.router.query.recipeId === undefined)
  return;
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
        'categoryId':parentProps.router.query.categoryId
      }
    )

  }

  var urlFetch = 'http://localhost:8080/api/admin/recipes'
  var response = await fetch(urlFetch, options)
  console.log(response)
  var bodyData = await response.json()
  console.log(bodyData)
  console.log(parentProps.router.query.recipeId)
  var result = bodyData.find(f=>f.recipeId == parentProps.router.query.recipeId)
  console.log('details')
  console.log(result)

 setValues({
  recipeId: result.recipeId,
    title: result.title,
    description: result.description,
    calories: result.calories,
    categoryId: result.categoryId,
    isVisible: true
  });

  var ingredientsDto = []
  for (let i = 0; i < result.ingredients.length; i++) {
    const ingredient = result.ingredients[i];

    ingredientsDto.push({
      productId: ingredient.productId,
      unitId: ingredient.unitId,
      quantity: ingredient.quantity,
    })

  }

  setIngredients(ingredientsDto)
}




useEffect(() => {
  fetchRecipe();

}, []);



 

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
function isInt(n){
    return 
}
function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

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

    if(values.productId ==='' || values.unitId === '' || values.quantity ==='')
    {
      alert(t("fullfill-ingredient"))
      return;
    }

    if(!isNumeric(values.quantity))
    {
      alert(t("number-force"))
      return;
    }

  
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
      if(parentProps.router.query.recipeId === undefined)
      {

            event.preventDefault();
            console.log(values);
            if(file === undefined){
              alert(t('choose-file'))
              return;
            }  
            
            if(values.title.length ===0){
              alert(t('set-title'))
              return;
            }   

            if(values.description.length ===0){
              alert(t('set-description'))
              return;
            }   

          
          if(ingredients.length ===0)
          {
            alert(t('set-ingredients'))
              return;
          }
          
      

            var userData = JSON.parse(localStorage.getItem('authenticated_user'))

            console.log(ingredients)
            var ingredientDtos = []
            for (let i = 0; i < ingredients.length; i++) {
              var ingredient = ingredients[i];
              ingredientDtos.push({
                "productId": ingredient.productId,
                "unitId": ingredient.unitId,
                "quantity": ingredient.quantity,
                "ordinalNr": i
              })
              
            }

      var recipeDto = {
        "categoryId": parseInt(currCatId),
        "ordinalNr": maxOrdinal,
        "title": values.title,
        "description": values.description,
        "calories": values.calories,
        "actionUserId": userData.id,
        "isVisible": values.isVisible? 1 :0,
        "ingredients": ingredientDtos
      }


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
          
            router.push('/recipes')

    }
    else{
      event.preventDefault();
      console.log(values);
      if(file === undefined){
        alert(t('choose-file'))
        return;
      }  
      
      if(values.title.length ===0){
        alert(t('set-title'))
        return;
      }   

      if(values.description.length ===0){
        alert(t('set-description'))
        return;
      }   

    
    if(ingredients.length ===0)
    {
      alert(t('set-ingredients'))
        return;
    }
    


      var userData = JSON.parse(localStorage.getItem('authenticated_user'))

      console.log(ingredients)
      var ingredientDtos = []
      for (let i = 0; i < ingredients.length; i++) {
        var ingredient = ingredients[i];
        ingredientDtos.push({
          "productId": ingredient.productId,
          "unitId": ingredient.unitId,
          "quantity": ingredient.quantity,
          "ordinalNr": i
        })
        
      }

var recipeDto = {
  recipeId: values.recipeId,
  "categoryId": values.categoryId,
  "ordinalNr": maxOrdinal,
  "title": values.title,
  "description": values.description,
  "calories": values.calories,
  "actionUserId": userData.id,
  "isVisible": values.isVisible? 1 :0,
  "ingredients": ingredientDtos
}
console.log('edit')
console.log(recipeDto)

      var url = 'http://localhost:8080/api/admin/recipes/edit'

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
    
      router.push('/recipes')

    }


    }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
      <CardHeader
          title={  parentProps.router.query.recipeId === undefined ?  t("add") : t("edit")}
        />
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
  rows={8}
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
