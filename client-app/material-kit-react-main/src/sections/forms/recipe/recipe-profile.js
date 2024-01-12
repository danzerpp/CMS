import { useTranslation }  from "react-i18next";

import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Anika Visser',
  timezone: 'GTM-7'
};
import i18n from "i18next";

export const RecipeProfile = ({ handleUpload }) =>{ 
  
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [fileToView, setFileToView] = useState();

  function handleForm(e) {
    console.log(e)
    e.preventDefault();
    const data = new FormData();
    data.append("image", file);
    data.append("title", title);
    data.append("desc", desc);
    console.log(file)
    console.log(title)
    console.log(desc)

    // fetch("http://localhost:8080/upload", {
    //   method: "POST",
    //   body: data,
    // });
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) 
    {
      const maxAllowedSize = 5 * 1024 * 1024;
      if (e.target.files[0].size > maxAllowedSize ||  e.target.files[0].size < 1024*100) {
      	// Here you can ask your users to load correct file
        alert(t("file-wrong-size"))
        e.target.value = ''
        return;
      }

      setFile(e.target.files[0]);
      handleUpload(e.target.files[0]);
      setFileToView(URL.createObjectURL(e.target.files[0]))
    }

  }


  return (
  <Card>
        <form>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <img src={fileToView}  width={350} height={250}/>
        <br></br>
        <input type="file" name="image" onChange={handleFileChange} accept="image/png, image/gif, image/jpeg"/>
        
      </Box>
    </CardContent>

      </form>
  </Card>
);}
