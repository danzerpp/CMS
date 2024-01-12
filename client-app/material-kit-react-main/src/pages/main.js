
import { Layout as MainLayout } from 'src/layouts/main/layout';

import {  useState } from 'react';
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
  FormControlLabel,
  Avatar
} from '@mui/material';
import { margin, width } from '@mui/system';

const data =[
  {
  id: 1,
  name: "Kuchnia włoska"
},
{
  id: 2,
  name: "Kuchnia Polska"
},
]
const Page = () =>
{
   const[categories,setCategories] = useState(data)
   const[recipes,setRecipes] = useState(data)
   const router = useRouter();
  
  
   var language = localStorage.getItem('app_language');
  
   if( language === undefined)
     language ='pl';

     function changeLanguage(){
      var language = localStorage.getItem('app_language')
      if(language === undefined || !language)
      {
        localStorage.setItem('app_language','en')
      }
      else 
      {
        localStorage.setItem('app_language',language === 'pl' ? 'en': 'pl')
  
      }
      window.location.reload();
    }

    const {t} = useTranslation();

  function categoryClicked(id)
  {
    console.log(id)
    var items = document.getElementsByClassName('category-name');
    for (let index = 0; index < items.length; index++) {
      document.getElementById(items[index].id).classList.remove('selected')
    }

    document.getElementById('category_'+ id).classList.add('selected')
  }

  function navigateToDetails(recipeId){
    window.open('/recipeDetails?recipeId=1','_blank')
  //   router.push({
  //     pathname: '/recipeDetails',
  //     query: { recipeId: recipeId }
  // }, '/recipeDetails')
      
  }

  return (
    
    <div className='main-page-holder'>
      <div className='changeLanguageBtn'>
                
                <Button
                onClick={changeLanguage}
                startIcon = {<Avatar src={language === 'pl' ? '/images/united-kingdom.png' : '/images/flag.png'} width={25} height={25} />}
                >

                </Button>
              </div>
        <div className='category-holder'>
          {
            categories.map(function(data) {
              return (
                <div id={'category_'+ data.id} className='category-name' onClick={function (e){categoryClicked(data.id)}}>
                 <h2>  {data.name}</h2>
                </div>
              )
            })
            
          }
        </div>
        <div style={{width:'50%',margin:'auto'}}>
        <TextField style={{width:'80%',margin:'auto'}} placeholder={t("search-recipe-text")}></TextField>
        </div>

        <div className='recipes-holder'>
        {
            categories.map(function(data) {
              return (

                <div className='recipe-detail'>
                  <div className='image-recipe'>
                    <img src='./images/pizza-image.jpg' className='image-style' ></img>

                  </div>


                  <div className='detail-recipe'>
                    <div className='details-recipe-texts'>
                    <div>     <h1>  {data.name}</h1></div>
                    <div>  <span>  Pizz awykonana w pełnej staranności i miłsfsddfsfdsfsfdsości wszystkicsddfsdfdsfsfsfdsh uzytkwoników<br></br> az chce się jeść !</span></div>
               
                 </div>
                  
               
                <div className='recipe-button'>
<Button onClick={function (e) {navigateToDetails(data.id)}} style={{ fontSize: '20px' }}>{t("detail-button")}</Button>

                </div>
                
                  </div>
                
                </div>
              )
            })
            
          }

        </div>
    </div>
  );
};

Page.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
);

export default Page;
