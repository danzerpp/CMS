import { useCallback, useState } from 'react';

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

export const AccountProfileDetails = ({maxLength}) => {
  const { i18n, t } = useTranslation();
const router = useRouter();
  
  const [values, setValues] = useState({
    name: '',
    isVisible: true
  });

  const handleChange = 
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    }

  const  handleSubmit = 
  async (event) => {
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
        ordinalNr: maxLength,
        createdByUserId: userData.id
      }
      console.log(categoryDto)
      const URL = 'http://localhost:8080/api/admin/categories/add'
 
    var options = {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
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

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
      <CardHeader
          title={t("add")}
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
