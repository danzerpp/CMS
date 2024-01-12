import { useTranslation }  from "react-i18next";

import { useState, useEffect } from "react";
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
import { ConstructionOutlined } from "@mui/icons-material";

export const RecipeProfile = ({ handleUpload, parentProps }) =>{ 
  
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


  async function fetchRecipe() {
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
      console.log(result)

     var srcImage = "data:image/png;base64, "+ result.image
     fetch(srcImage)
     .then(res => res.blob())
     .then(blob => {
       const file = new File([blob], "File name",{ type: "image/png" })
       console.log(file)
       setFile(file);
       handleUpload(file);
       setFileToView(URL.createObjectURL(file))
     })

  };


  useEffect(() => {
    fetchRecipe();
  
}, []);


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
