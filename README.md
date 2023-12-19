Current endpoints:
![Zrzut ekranu 2023-12-19 o 21 29 44](https://github.com/danzerpp/CMS/assets/59024079/60eaa0e5-e99e-4c00-b0ae-f46ff9c53f5e)

**/api/v1/auth/login**
- request body:
    {
      "email": "string",
      "password": "string"
    }
- response:
    {
      "token": "string",
      "email": "string",
      "userId": 0,
      "role": "string"
    }

**/api/v1/auth/register**
- request body: 
    {
      "fullName": "string",
      "email": "string",
      "password": "string",
      "role": "string"
    }
- response:
      {
        "token": "string",
        "email": "string",
        "userId": 0,
        "role": "string"
      }

  
