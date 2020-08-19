  
/************************************************ 
    search recipe - recipes/search
    get recipe infornmation - recipes/{id}/information
                    information :
        id -            "id": 716429,
        name-           "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
        image-          "image": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
                        "imageType": "jpg",
        servings-       "servings": 2,
        makingTime -    "readyInMinutes": 45,
        cuisines-       "cuisines": [],
        diet-           "diets": [],
        gluten-         "glutenFree": false,
        vegan-          "vegan": false,
        vegetarian-     "vegetarian": false,
        popularity-     "aggregateLikes": 209,
*************************************************/

var express = require("express");
var router = express.Router();
const searchUtil = require("./RecipeInfoUtil")

const axios = require("axios"); 
const api_domain = "https://api.spoonacular.com/recipes";


router.get( '/getRandomize' , async (req, res, next) => {
  try {
    var userId = 0;
    if(typeof req.session.user_id !== 'undefined' && req.session.user_id){
       userId = req.session.user_id;
    }
    else{
      userId = -1;
    }
    const search_response = await axios.get(`${api_domain}/random?number=3`, {
      params: {
        apiKey: process.env.spooncular_apiKey
      }
    });
    let recipes = await Promise.all(
      search_response.data.recipes.map((recipe_raw) =>
      searchUtil.getRecipeInfo(recipe_raw.id , userId)
      )
    );
    recipes = recipes.map((recipe) => recipe.data);
    res.send({ data: recipes });
  } catch (error) {
    next(error);
  }
});

router.get('/search' , async (req, res, next) => {
    try {
      var userId = 0;
      if(typeof req.session.user_id !== 'undefined' && req.session.user_id){
        userId = req.session.user_id;
      }
      else{
        userId = -1;
      }
      const {  query, cuisine, diet, number } = req.query;
      if(!query || query == ""){
        res.status(400);
      }
      else{
        if (number == 0){
          number = 5
        }
        const search_response = await axios.get(`${api_domain}/search`, {
          params: {
            query: query,
            cuisine: cuisine,
            diet: diet,
            intolerances: "",
            number: number,
            instructionsRequired: true,
            apiKey: process.env.spooncular_apiKey
          }
        });
        let recipes = await Promise.all(
          search_response.data.results.map((recipe_raw) =>
          searchUtil.getRecipeInfo(recipe_raw.id , userId)
          )
        );
        recipes = recipes.map((recipe) => recipe.data);
        res.send({ data: recipes });
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
