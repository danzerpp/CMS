
import { Layout as MainLayout } from 'src/layouts/main/layout';

import {  useState,useEffect } from 'react';
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
   const[categories,setCategories] = useState([])
   const[recipes,setRecipes] = useState([])
   const[title,setTitle] = useState('')
   const[categorySelected,setCategorySelected] = useState()
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
    setCategorySelected(id);
    document.getElementById('category_'+ id).classList.add('selected')
    fetchRecipes(id);
  }

  function compareDecimals(a, b) {
    if (a.ordinalNr === b.ordinalNr) 
         return 0;

    return a.ordinalNr - b.ordinalNr;
}

function changeFilter(e)
{
  setTitle(e.target.value);
 
    fetchRecipes(categorySelected,e.target.value)

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

    const URL = 'http://localhost:8080/home/categories'
     var response = await fetch(URL, options)
    var bodyData = await response.json();
    bodyData.sort(compareDecimals )
    console.log(bodyData)
    setCategories(bodyData);  
    if(bodyData.length >0)
    setTimeout(() => {
      categoryClicked(bodyData[0].categoryId);
    }, 100);
  };

  async function fetchRecipes(categoryId,titleRecipe) {

    var options = {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':  'Bearer ' +window.sessionStorage.getItem('token') 
      },
      body:JSON.stringify({
          'title': titleRecipe,
          categoryId: categoryId
      })
    }

    const URL = 'http://localhost:8080/home/recipes'
     var response = await fetch(URL, options)
    var bodyData = await response.json();
    bodyData.sort(compareDecimals )
    console.log(bodyData)
    setRecipes(bodyData);
  };


  useEffect(() => {

    fetchCategories();
}, []);


  function navigateToDetails(recipeId){
    window.open('/recipeDetails?recipeId='+recipeId ,'_blank')
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
                <div id={'category_'+ data.categoryId} className='category-name' onClick={function (e){categoryClicked(data.categoryId)}}>
                 <h2>  {data.name}</h2>
                </div>
              )
            })
            
          }
        </div>
        <div style={{width:'50%','margin-left':'auto','margin-right':'auto'}}>
        <TextField style={{width:'80%',margin:'auto'}} placeholder={t("search-recipe-text")} onChange={changeFilter}></TextField>
        </div>

        <div className='recipes-holder'>
        {
            recipes.map(function(data) {
              return (

                <div className='recipe-detail'>
                  <div className='image-recipe'>
                    <img src={"data:image/png;base64, "+ data.image} className='image-style' ></img>
                  </div>


                  <div className='detail-recipe'>
                    <div className='details-recipe-texts'>
                    <div>     <h1>  {data.title}</h1></div>
                    <div>  <span style={{'white-space': 'pre-line'}}> {data.description}</span></div>
               
                 </div>
                  
               
                <div className='recipe-button'>
<Button onClick={function (e) {navigateToDetails(data.recipeId)}} style={{ fontSize: '20px' }}>{t("detail-button")}</Button>

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
