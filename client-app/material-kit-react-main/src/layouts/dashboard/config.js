import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import { GridLoadIcon, GridMenuIcon } from '@mui/x-data-grid';
import { CalendarIcon } from '@mui/x-date-pickers';
import i18n from 'src/i18n';


    var userData = JSON.parse(localStorage.getItem('authenticated_user'))
    console.log(userData);
    var itemss = [
      {
        title: i18n.t("home"),
        path: '/',
        icon: (
          <SvgIcon fontSize="small">
            <ChartBarIcon />
          </SvgIcon>
        )
      },
      {
        title: i18n.t("users"),
        path: '/users',
        icon: (
          <SvgIcon fontSize="small">
            <UsersIcon />
          </SvgIcon>
        )
      },
      {
        title: i18n.t("categories"),
        path: '/categories',
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBagIcon />
          </SvgIcon>
        )
      },
      {
        title: i18n.t("recipes"),
        path: '/recipes',
        icon: (
          <SvgIcon fontSize="small">
            <UserIcon />
          </SvgIcon>
        )
      }
      ,
      {
        title: i18n.t("main-page-route"),
        path: '/main',
        icon: (
          <SvgIcon fontSize="small">
            <GridMenuIcon />
          </SvgIcon>
        )
      }
    ]
    if(userData.role !=="ADMIN")
    itemss = itemss.filter(i=> i.path !=='/users' && i.path !=='/categories')
    
export const items = [...itemss];

