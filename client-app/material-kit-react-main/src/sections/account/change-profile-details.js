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
  Unstable_Grid2 as Grid
} from '@mui/material';


const states = [
  {
    value: 1,
    label: 'ADMIN'
  },
  {
    value: 2,
    label: 'CHEF'
  }
];

export const ChangePasswordDetails = ({userId, email}) => {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const [values, setValues] = useState({
    userId: userId,
    password: '',
    passwordConfrm: '',
  });

  const handleChange = 
    (event) => {
    
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
      console.log(values)
    }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const  handleSubmit = 
  async (event) => {
      event.preventDefault();
      console.log(values);
   
     if(values.password.length < 6){
      alert(t("wrong-password"));
      return;
     }

     if(values.password !== values.passwordConfrm){
      alert(t("wrong-password-confirm"));
      return;
     }

    
  var userDto = {
    userId: values.userId,
    password :values.password

  }
   
    const URL = 'http://localhost:8080/api/admin/users/changePassword'
 
    var options = {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
       'Content-Type': 'application/json',
        'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
      },
      body : JSON.stringify(userDto)
    }

    var response = await fetch(URL,options);
    console.log(response);

    router.push('/users')

    }

  

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          title={t("change-password")}
          subheader={email}
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
                  label={t("password")}
                  name="password"
                  onChange={handleChange}
                  type='password'
                  required
                  value={values.lastName}
                  inputProps={{ minLength: 6 }}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label={t("password-again")}
                  name="passwordConfrm"
                  onChange={handleChange}
                  type='password'
                  required
                  value={values.lastName}
                  inputProps={{ minLength: 6 }}
                />
              </Grid>
            
        
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type='submit' variant="contained" >
          {t("save")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
