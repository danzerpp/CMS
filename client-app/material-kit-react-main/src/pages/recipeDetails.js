
import { Layout as MainLayout } from 'src/layouts/main/layout';

import {  useState } from 'react';
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
  FormControlLabel,
  Avatar
} from '@mui/material';
import { margin, width } from '@mui/system';
import { withRouter,useRouter } from 'next/router'

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
const Page = (props) =>
{
   const[categories,setCategories] = useState(data)
   const[recipes,setRecipes] = useState(data)
   console.log(props.router.query.recipeId);
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

  function clickeddd(e)
  {
    router.push('/main')
  }
  return (
    
    <div className='main-detail-page-holder'>
       <div className='image-detail-holder'>
<h1>PIZZA ITALIANA</h1>     </div>
      <div className='image-detail-holder'>
        <img src='./images/pizza-image.jpg' width={640} height={412} ></img>
      </div >
   
      <div className='article-detail'>
      <h3>Opis przepisu</h3>

        <p>Przepis został wykoanny starannie jak nigdblablablablalablablbblaballbalbalbalablababababyPrzepis został wykoanny starannie jak nigdblablablablalablablbblaballbalbalbalablababababyPrzepis został wykoanny starannie jak nigdblablablablalablablbblaballbalbalbalablababababyPrzepis został wykoanny starannie jak nigdblablablablalablablbblaballbalbalbalablababababy</p>
        </div>
        <div className='article-detail'>
      <h3>Kalorie</h3>

        <p>250 kcal</p>
        </div>
        <div className='article-detail'>
      <h3>Składniki</h3>
      <p>Mąka - 200 gram</p>
      <p>Jajka - 3 szt.</p>
        </div>
    </div>
    
  );
};

Page.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
);

export default withRouter(Page);
