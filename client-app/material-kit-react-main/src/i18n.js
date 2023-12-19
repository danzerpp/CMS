import i18n from "i18next";
import { initReactI18next } from "react-i18next";


function getCurrentLang(){
    var language = 'pl';

    if (typeof window !== 'undefined') {
    var language = localStorage.getItem('app_language')
    if(language === undefined || !language)
    {
        language = 'pl'
        localStorage.setItem('app_language',language)
    }
}

    return 'pl';
}

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: getCurrentLang(),
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          title: "Multi-language app",
          label: "Select another language!",
          about: "About",
          home: "Home",
          users: "Users",
          categories: "Categories",
          recipes: "Recipes",
          adminpagename : "Page with recipes",
          adminpagedesc : "Adminsitration panel",
          "welcome-login-page":"Welcome in ",
          "welcome-login-page-title":"Your's Recipes",
          "welcome-login-page-desc":"Prefessional protal for food recipes",
          login: "Login",
          "reset-password-desc":"Have you forgotten your password?",
          "reset-password":"Reset",
          "address-email":"Email address",
          "password":"Password",
          "login-button":"Login",
          "reset-title":"Reset password",
          "reset-title-return":"Do you remember password?",
          "reset-title-return-login":"Log in",
          "reset-email":"Email Adrress",
          "reset-button":"Reset",
          "change-password":"Change password",
          "logout":"Sign out",
          "account":"Account",
        },
      },
      pl: {
        translation: {
          title: "MULTI PART po polsku baybe",
          label: "Selecciona otro lenguaje!",
          about: "Sobre mí",
          home: "Strona domowa",
          users: "Użytkownicy",
          categories: "Kategorie",
          recipes: "Przepisy",
          adminpagename : "Strona z przepisami",
          adminpagedesc : "Panel administratora",
          "welcome-login-page":"Witaj na stronie ",
          "welcome-login-page-title":"Twoje Przepisy",
          "welcome-login-page-desc":"Profesjonalny portal do zarządzania przepisami kulinarnymi",
          login: "Logowanie",
          "reset-password-desc":"Zapomniałeś hasła?",
          "reset-password":"Resetuj",
          "address-email":"Adres email",
          "password":"Hasło",
          "login-button":"Zaloguj się",
          "reset-title":"Resetuj hasło",
          "reset-title-return":"Pamiętasz hasło?",
          "reset-title-return-login":"Zaloguj się",
          "reset-email":"Adres email",
          "reset-button":"Resetuj",
          "change-password":"Zmień hasło",
          "logout":"Wyloguj się",
          "account":"Konto użytkownika",
        },
      }
    }
  });
   

export default i18n;