Current endpoints:
![Zrzut ekranu 2023-12-19 o 21 29 44](https://github.com/danzerpp/CMS/assets/59024079/60eaa0e5-e99e-4c00-b0ae-f46ff9c53f5e)

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
  
