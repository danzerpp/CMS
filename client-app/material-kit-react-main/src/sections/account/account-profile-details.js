import { useCallback, useState , useEffect} from 'react';

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

export const AccountProfileDetails = ({parentProps}) => {
  const { i18n, t } = useTranslation();
  const [values, setValues] = useState({
    fullname: 'sdfsfs',
    password: 'sss',
    email: 'sdfsdfsd',
    role: 2
  });

  const router = useRouter();
const[isLoading,setIsLoading] = useState(false);

  async function fetchUser() {
    console.log('haha')
    console.log(parentProps.router.query.userId)
    if(parentProps.router.query.userId === undefined)
    return;

var data = {}
      var options = {  
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
        }
      }
  
      const urll = 'http://localhost:8080/api/admin/users/'+parentProps.router.query.userId
       var response = await fetch(urll, options)
      var existingUser = await response.json()

      if(existingUser === null)
      {
        data = {
          fullname: '',
          password: '',
          email: '',
          role: 1
        };
      }
      else{
        data = {
          fullname: existingUser.fullName,
          email: existingUser.email,
          role: existingUser.role.id
        };
      }
    console.log('haha22')
    setValues(data)
    console.log(data)
    console.log('haha33')
    setTimeout(() => {
      setIsLoading(false)
        
      }, 222);
  }
  
 


  useEffect(() => {
     fetchUser();
 
}, []);

  const handleChange = 
    (event) => {
      console.log(event)
      console.log(event.target.name)
      console.log(event.target.value)
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const  handleSubmit = 
  async (event) => {

      event.preventDefault();
      if(parentProps.router.query.userId === undefined)
    {

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
  else{
      if(!validateEmail(values.email)){
        alert(t("wrong-email"));
        return;
    }
  
    if(values.fullname.length < 1){
      alert(t("wrong-fullname"));
      return;
    }

  var userDto = {
    fullName: values.fullname,
    email : values.email,
    password :'',
    roleId: values.role,
    isVisible:1
  }
  
    const URL = 'http://localhost:8080/api/admin/users/edit'

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

    }

    if (isLoading) {
      return null;
    }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          title={  parentProps.router.query.userId === undefined ?  t("add") : t("edit")}
          subheader = {parentProps.router.query.userId === undefined ? '':values.email}
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
                  value={values.fullname}
                  onChange={handleChange}
                  required
                />
              </Grid>
              { parentProps.router.query.userId === undefined && (<Grid
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
                  value={values.password}
                />
              </Grid>)}
            
              { parentProps.router.query.userId === undefined && (<Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label={t("address-email")}
                  name="email"
                  inputProps={
                    { readOnly: true, }
                  }
                  type='email'
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>)}
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
                  value={values.role}
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
