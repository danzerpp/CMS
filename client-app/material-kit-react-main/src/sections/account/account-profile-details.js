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

export const AccountProfileDetails = () => {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const [values, setValues] = useState({
    fullname: '',
    password: '',
    email: '',
    role: 1
  });

  const handleChange = 
    (event) => {
      console.log(event)
      console.log(event.target.name)
      console.log(event.target.value)
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
     if(!validateEmail(values.email)){
        alert(t("wrong-email"));
        return;
     }
     if(values.password.length < 6){
      alert(t("wrong-password"));
      return;
     }
     if(values.fullname.length < 1){
      alert(t("wrong-fullname"));
      return;
     }
  var userDto = {
    fullName: values.fullname,
    email : values.email,
    password :values.password,
    roleId: values.role,
    isVisible:1
  }
   
    const URL = 'http://localhost:8080/api/admin/users/add'
 
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
                  label= {t("user-name")}
                  name="fullname"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
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
                  label={t("address-email")}
                  name="email"
                  type='email'
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label= {t("user-select-rolename")}
                  name="role"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
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
