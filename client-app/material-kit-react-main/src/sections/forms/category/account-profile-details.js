import { useCallback, useState, useEffect } from 'react';

import { useTranslation }  from "react-i18next";
import { useRouter } from 'next/navigation';

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
  Checkbox,
  FormControlLabel
} from '@mui/material';

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

export const AccountProfileDetails = ({parentProps}) => {
  const { i18n, t } = useTranslation();
const router = useRouter();
  
console.log(parentProps.router.query)


  const [values, setValues] = useState({
    name: '',
    isVisible: true
  });



  async function fetchCategory() {
    if(parentProps.router.query.categoryId === undefined)
    return;

      var options = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
        }
      }
  
      const urll = 'http://localhost:8080/api/admin/categories/'+parentProps.router.query.categoryId
       var response = await fetch(urll, options)
      var existingCategory = await response.json()
      setValues(
        {
          categoryId: parentProps.router.query.categoryId,
          name: existingCategory.name,
          isVisible: true
        }
      )
  }

  useEffect(() => {
    fetchCategory();

}, []);


  const handleChange = 
    (event) => {

      var val = event.target.value
      if(event.target.name == 'isVisible')
        val = event.target.checked;

      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: val
      }));
    }

  const  handleSubmit = 
  async (event) => {
    if(parentProps.router.query.categoryId === undefined)
    {
          event.preventDefault();
          console.log(values)
          if(values.name.length ==0)
          {
            alert(t("error-category-name"))
            return;
          }
          var userData = JSON.parse(localStorage.getItem('authenticated_user'))

          var categoryDto = {
            name : values.name,
            isVisible: values.isVisible ? 1 :0,
            ordinalNr: parentProps.router.query.maxOrdinal,
            createdByUserId: userData.id
          }
          console.log(categoryDto)
          const URL = 'http://localhost:8080/api/admin/categories/add'
    
        var options = {  
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':  'Bearer ' + window.sessionStorage.getItem('token') 
          },
          body : JSON.stringify(categoryDto)
        }
        console.log(options)

        var response = await fetch(URL,options);

        if(response.status === 200)
          router.push('/categories')
        else{
          alert(await response.text())
        }
      }
      else{
        console.log('there is else')
        event.preventDefault();
        console.log(values)
        if(values.name.length ==0)
        {
          alert(t("error-category-name"))
          return;
        }

        var userData = JSON.parse(localStorage.getItem('authenticated_user'))
console.log('categoryDTO')
        var categoryDto = {
          categoryId: values.categoryId,
          name : values.name,
          isVisible: values.isVisible ? 1 :0,
          ordinalNr: 0,
          createdByUserId: userData.id
        }

        console.log(categoryDto)
        const URL = 'http://localhost:8080/api/admin/categories/edit'
  
      var options = {  
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':  'Bearer ' + window.sessionStorage.getItem('token') 
        },
        body : JSON.stringify(categoryDto)
      }
      console.log(options)

      var response = await fetch(URL,options);
      console.log(response)

      if(response.status === 200)
        router.push('/categories')
      else{
        alert(await response.text())
      }

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
          title={  parentProps.router.query.categoryId === undefined ?  t("add") : t("edit")}
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
                  label= {t("name")}
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
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
                />

                }
                 label={t("is-visible")}/>
              </Grid>
            
             
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type='submit' variant="contained">
            {t("save")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
