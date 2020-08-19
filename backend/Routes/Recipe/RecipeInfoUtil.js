var express = require("express");
const DBcontroller = require("../../DataBase/DBcontroller");
const axios = require("axios"); 
const api_domain = "https://api.spoonacular.com/recipes";

exports.getRecipeInfo = async function getRecipeInfo(id , userId)
{
    try{
        const recipeInfo = await axios.get(`${api_domain}/${id}/information?includeNutrition=false`, {
            params: {
                apiKey: process.env.spooncular_apiKey
            }
          });
          const element = recipeInfo.data; 
            var info = new Object();
            info.data = new Object();
            info.data.id = id;
            info.data.Name = element.title;
            info.data.imageLink = element.image;
            info.data.imageType = element.imageType;
            info.data.timeMinutes = element.readyInMinutes;
            info.data.likes = element.aggregateLikes;
            info.data.vegan = element.vegan;
            info.data.vegetarian = element.vegetarian;
            info.data.glutenFree = element.glutenFree;
        
            info.data.servings = element.servings;
            info.data.instruction = element.analyzedInstructions;
            info.data.ingridiantsList = element.extendedIngredients;
        
            if(userId != -1){
              let query1 = `SELECT COUNT(*) as val FROM UserWatchedRecipe WHERE user_Id='${userId}' and recipe_Id='${info.data.id}'`
              let query2 = `SELECT COUNT(*) as val FROM UserSavedRecipe WHERE user_Id='${userId}' and recipe_Id='${info.data.id}'`
              try{
                let x = await DBcontroller.execQuery(query1);
                info.data.watched = x[0].val;
              } 
              catch (error) {
                next(error);
              }
              try{
                let x = await DBcontroller.execQuery(query2);
                info.data.saved = x[0].val;
              } 
              catch (error) {
                next(error);
              }
            }
            else{
              info.data.watched = 0;
              info.data.saved = 0;
            }
            
            return info;
    }
    catch(error){
        console.log(error)
        next(error);

    }
}

/*
app.use("/:recipeid", function (req, res, next) {
  if (req.params.recipeid != '') 
  {
    res.sendStatus(401);
  }
  else
  {
    next();
  } 
});

router.get("/:recipeId/insertRecipeByImg", async (req, res, next) => {
  try {
    const userId = req.user_id;
    const recipe_id = req.params.recipeid;
    const watchedTime = Date.now();
    let query = `INSERT INTO UserWatchedRecipe VALUES ('${userId}', '${recipe_id}' , '${watchedTime}')`
    await DButils.execQuery(query);
    res.status(200).send({ message: "recipe added to user watched list", success: true });
  } catch (error) {
    next(error);
  }
});
router.get("/:recipeId/likeRecipe", async (req, res, next) => {
  try {
    const userId = req.user_id;
    const recipe_id = req.params.recipeid;
    let query = `INSERT INTO UserWatchedRecipe VALUES ('${userId}', '${recipe_id}')`
    await DButils.execQuery(query);
    res.status(200).send({ message: "recipe added to Liked list", success: true });
  } catch (error) {
    next(error);
  }
});
//#region
router.get("/:recipeId/addRecipeToFavorites", async (req, res, next) => {
  try {
    const userId = req.user_id;
    const recipe_id = req.params.recipeid;
    let query = `INSERT INTO UserSavedRecipe VALUES ('${userId}', '${recipe_id}')`
    await DButils.execQuery(query);
    res.status(200).send({ message: "recipe added to user Favorites list", success: true });
  } catch (error) {
    next(error);
  }
});
//#endregion
*/
//************************************** MEAL FUNCTION ************************************************************ */
/*
router.get("/:recipeId/prepareRecipe", async (req, res, next) => {
  try {
    const userId = req.user_id;
    const recipe_id = req.params.recipeid;
    let query = `INSERT INTO UserWatchedRecipe VALUES ('${userId}', '${recipe_id}')`
    await DButils.execQuery(query);
    res.status(200).send({ message: "recipe added to Liked list", success: true });
  } catch (error) {
    next(error);
  }
});
router.get("/:recipeId/addToMeal", async (req, res, next) => {
  try {
    const userId = req.user_id;
    const recipe_id = req.params.recipeid;
    const level = req.body.mealLevel;
    let query = `INSERT INTO UserMeals VALUES ('${userId}', '${recipe_id}' , '${level}')`
    await DButils.execQuery(query);
    res.status(200).send({ message: "recipe added to user Meal", success: true });
  } catch (error) {
    next(error);
  }
});
*/
