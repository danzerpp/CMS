import i18n from "i18next";
import { initReactI18next } from "react-i18next";


function getCurrentLang(){
    var language = 'pl';

    if (typeof window !== 'undefined') {
     language = localStorage.getItem('app_language')
 
    if(language === undefined || !language)
    {
        language = 'pl'
        localStorage.setItem('app_language',language)
    }


}

    return language;
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
          title: "Title",
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
          "error-login" : "Wrong login or password",
          "user-name" : "Fullname",
          "user-email" : "Email",
          "user-rolename" : "Role",
          "button-save" : "Save",
          "button-cancel" : "Cancel",
          "user-select-rolename" : "Select role",
          "add" : "Add",
          "upload-picture" : "Upload picture",
          "return" : "Go back",
          "main-page-route" : "Show page with recipes",
          "is-visible" : "Is visible",
          "name" : "Name",
          "save": "Save",
          "edit": "Edit",
          "delete": "Delete",
          "recipes-select-category": "Select category",
          "description": "Description",
          "calories": "Calories",
          "ingredients": "Ingredients",
          "move": "Move",
          "actions": "Actions",
          "product-name": "Product name",
          "unit-name": "Unit name",
          "quantity": "Quantity",
          "search-recipe-text": "Enter the name of the recipe to find it",
          "detail-button": "Show recipe details",
          "file-wrong-size": "File has to be between 100KB and 5 MB",
          "wrong-email": "Wrong email!",
          "wrong-password": "Password must contain at least 6 characters!",
          "wrong-fullname": "Please provide fullname!",
          "error-category-name": "Please provide category name!",
          "choose-file": "Choose file!",
          "set-title": "Provide title!",
          "set-description": "Provide description!",
          "set-ingredients": "Add ingredients!",
          "fullfill-ingredient": "Provide all data for ingredient!",
          "number-force": "Quantity must be a number!",
          "delete-confirm": "Are you sure you want to delete this record?",
          "error-login-deleted": "Your account is locked",
          "password-again": "Confirm password",
          "wrong-password-confirm": "Passwords are not same",
        },
      },
      pl: {
        translation: {
          title: "Tytuł",
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
          "error-login" : "Błędny login lub hasło",
          "user-name" : "Imię i nazwisko",
          "user-email" : "Email",
          "user-rolename" : "Rola",
          "user-select-rolename" : "Wybierz rolę",
          "button-save" : "Zapisz",
          "button-cancel" : "Anuluj",
          "add" : "Dodaj",
          "upload-picture" : "Załaduj zdjęcie",
          "return" : "Wróć",
          "main-page-route" : "Wyświetl stronę z przepisami",
          "is-visible" : "Widoczne",
          "name" : "Nazwa",
          "save": "Zapisz",
          "edit": "Edytuj",
          "delete": "Usuń",
          "recipes-select-category": "Wybierz kategorię",
          "description": "Opis",
          "calories": "Kalorie",
          "ingredients": "Składniki",
          "move": "Przesuń",
          "actions": "Akcje",
          "product-name": "Nazwa produktu",
          "unit-name": "Nazwa jednostki",
          "quantity": "Ilość",
          "search-recipe-text": "Wpisz nazwę przepisu, aby go znaleźć",
          "detail-button": "Pokaż szczegóły przepisu",
          "file-wrong-size": "Plik musi mieć więcej niż 100 KB i mniej niż 5MB",
          "wrong-email": "Błędny email!",
          "wrong-password": "Hasło musi zawierać co najmniej 6 znaków!",
          "wrong-fullname": "Proszę podać imię i nazwisko!",
          "error-category-name": "Proszę podać nazwę przepisu!",
          "choose-file": "Wybierz plik!",
          "set-title": "Wpisz tytuł przepisu!",
          "set-description": "Wpisz opis przepisu!",
          "set-ingredients": "Dodaj składniki!",
          "fullfill-ingredient": "Wypełnij dane składników!",
          "number-force": "Ilośc musi być liczbą!",
          "delete-confirm": "Na pewno usunąć rekord?",
          "error-login-deleted": "Twoje konto jest zablokowane",
          "password-again": "Potwierdź hasło",
          "wrong-password-confirm": "Hasła nie są identyczne",

        },
      }
    }
  });
   

export default i18n;