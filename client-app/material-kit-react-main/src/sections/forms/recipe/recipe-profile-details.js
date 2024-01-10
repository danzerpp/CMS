import { useCallback, useState,useEffect } from 'react';

import { useTranslation }  from "react-i18next";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  TextareaAutosize,
  FormControlLabel,
  number,
  Checkbox
} from '@mui/material';
import { FamilyRestroomRounded } from '@mui/icons-material';

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

export const RecipeProfileDetails = ({file}) => {
  const { i18n, t } = useTranslation();
  const [sbData, setsbData] = useState([]);
  const [sbValue, setsbValue] = useState(0);


  async function saveRecipe (){
  
    const data = new FormData();
    data.append("recipeId", 1);
    data.append("recipeImage", file);


    console.log(file)


   
    const URL = 'http://localhost:8080/api/admin/recipes/uploadImage'
 
    var options = {  
      method: 'POST',
      headers: {
        'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
      },
      body : data
    }

   var response = await fetch(URL,options);
    
    console.log(response);


    

  }

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

  
  const [values, setValues] = useState({
    title: 'Anika',
    description: 'Visser',
    calories: 0,
    categoryId: 0,
    isVisible: true
  });

  const handleChange = useCallback(
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
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        
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
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained"
            onClick={saveRecipe}
          >
                        {t("save")}

          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
