# Recipes-Website

# INTRODUCTION
This is a full-stack Project about Recipes website.

The project includes 3 parts-

First part- API: the API was written in yaml, ans will guide the folowing parts.

Second part- Server side: The server was developed in Node.js environment and Express.js framework. This part includes a connection with external API (https://spoonacular.com/food-api/) and uses a MySQL DB in Azure platform.

Third part- Client side: The client was developed in Vue.js framework, and include using bootstrap-vue components.

# OPERATIONS
When a user open the website, he can discover random recipe, search a recipe, open a new account or log in to exist account.

After a user logs in he has the options to see the last three recipes he watched, see his family recipes, personal recipes and the recipes he liked, and add new recipes to this favorites list.

Search recipes - Any user can seach for a recipe by a search query, and choose how many results he would like to get.

In addition, there is an option to filter the results by cuisine, diet or intolerances (before searching), and sort thr results by popularity or making time.

Discover new recipes - when a user opens the home page, he can see a list of a 3 random recipes which can be changed by clicking the "discover more" button.

Add a recipe to to the favorites list - There are two ways to add a recipe to the account's favorites list:

by clicking the "add to favorites" button on the recipe preview.
by clicking the "add to favorites" button in the recipe presentation page.
3 last recently watched recipes - when a connected user opens the home page, will see a list of the 3 last recipes he watched.

currently, users don't have the option to add family and presonal recipes by themselves, and the recipes were added in advance to the DB (that functionality might be added in the future..) An example to exist user with all kinds of recipes:

username: noashab

password: 12345

# INFO
Project name: Recipes website

Node.js: 12.x

Vue.js: 2.6.11
