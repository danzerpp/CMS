**CMS System for manage recipes and building layout for user page**

**Introduction**

The aim of project is to manage recipes created by admins or cookers and publishing them to public website sorted and assigned to proper category. There are 3 roles in system - admin, cooker and user. Division of possible method used by proper role is listed below. 

In system are two dashboard, the first is for admins and cooker to mange recipes and the second is for user to visit website and browse all created recipes by admins and cookers.

**Technology stack:**
- Java, Spring Boot for Backend
- React, NextJs for Frontend
- PostreSQL 

**Endpoints for admin:**
- POST /api/admin/users/add - Adds a new user.
- DELETE /api/admin/users/remove/{userId} - Deletes a user with the specified ID.
- PUT /api/admin/users/edit/{userId} - Edits the data of a user with the specified ID.
- POST /api/admin/categories/add - Adds a new category.
- DELETE /api/admin/categories/remove/{categoryId} - Deletes a category with the specified ID.
- PUT /api/admin/categories/edit/{categoryId} - Edits the data of a category with the specified ID.
- POST /api/admin/recipes/add - Adds a recipe to an existing category.
- DELETE /api/admin/recipes/remove/{recipeId} - Deletes a recipe with the specified ID.
- POST /api/admin/recipes/uploadImage - Adds an image for a recipe.
- PUT /api/admin/recipes/edit - Edits the recipe with the specified ID.
- PUT /api/admin/recipes/changeOrder - Sets the order in which recipes are displayed for a given category.
- PUT /api/admin/categories/changeOrder - Sets the order in which the categories are displayed.
- GET /api/admini/recipes - Returns a list of recipes by category.
- GET /api/admini/recipes/{recipeId} - Returns the recipe details.
- GET /api/admin/categories - Returns a list of categories.
- GET /api/admin/users - Returns a list of users.
- GET /api/admin/units - Returns a list of units.
- GET /api/admin/products - Returns a list of products.

**Endpoints for the cook:**
- POST /api/admin/categories/recipes/add - Adds a recipe to an existing category.
- PUT /api/admin/recipes/edit/{recipeId} - Edits a recipe with the specified ID.
- PUT /api/chefs/recipes/{recipeId}/category - Assigns a recipe to an existing category.

**Endpoints for the user:**
- GET /home/recipes - Returns recipes from a given category and filters by title name.
- GET /home/recipe - Returns recipes with the specified id.
- GET /home/categories - Returns a list of categories.

**Dashboard to manage recipes:**
![Zrzut ekranu 2024-03-20 o 12 45 52](https://github.com/KacperC948/CMS/assets/59024079/b2ccb481-7bbe-40d5-b69a-2c9ec23e1297)
![Zrzut ekranu 2024-03-20 o 12 46 23](https://github.com/KacperC948/CMS/assets/59024079/9e63504c-ee3c-4556-822d-8159443d6c51)
![Zrzut ekranu 2024-03-20 o 12 47 32](https://github.com/KacperC948/CMS/assets/59024079/1dc88d98-ed12-4da7-96e2-3b1cad5d888b)
![Zrzut ekranu 2024-03-20 o 12 57 50](https://github.com/KacperC948/CMS/assets/59024079/a38b5b55-7d4e-428a-94e9-ddf7d6fafefa)

#Public dashboard for user for browse recipes
![Zrzut ekranu 2024-03-20 o 12 58 39](https://github.com/KacperC948/CMS/assets/59024079/f0f9043b-ad43-47d4-a285-9253d999a6f2)
![Zrzut ekranu 2024-03-20 o 12 58 52](https://github.com/KacperC948/CMS/assets/59024079/cb1de8c9-30e5-44d8-88d1-2fd5a6c7f165)
