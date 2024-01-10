import { useCallback, useState } from 'react';

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

export const AccountProfileDetails = () => {
  const { i18n, t } = useTranslation();
  
  const [values, setValues] = useState({
    name: '',
    isVisible: true
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
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
          <Button variant="contained">
            {t("save")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
