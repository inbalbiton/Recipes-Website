var express = require("express");
var router = express.Router();
const utils = require("./utils");
const searchUtils = require("../Recipe/RecipeInfoUtil");

// Authenticate all incoming requests 
router.use(function(req,res, next) {
  if( req.session && req.session.user_id){
    const id = req.session.user_id;
    utils.checkIdOnDb(id)
                  .then( (user) => {
                    if(user){
                     if(user.user_id){
                        req.username = user.user_id;
                        next();
                      }
                    }
                    else{
                      res.status(401);
                    }
                  } ).catch( (err) => next (err))
  }
  else{
    res.status(401).send();
  }
});

/*************************************************
 *                 Add Functions                 *
 *                                               *
 ************************************************/
//works
router.post("/userWatchRecipe", async (req, res, next) => {
  const user_id = req.user_id;
  const Recipe_Id = req.body.Recipe_Id;
  try{
    utils.userWatchRecipe(Recipe_Id,user_id);
    res.status(200).send("recipe add to watch list sucssesfuly");
  }catch(error){
    next(error);
  }
});

//works
router.post("/addFavoriteRecipe" , async (req, res) => {
  const user_id = req.user_id;
  const Recipe_Id = req.body.Recipe_Id;
  try{
    await utils.addRecipeToFavorite(Recipe_Id,user_id);
    res.sendStatus(200).send("recipe add to favorite sucssesfuly");
  }catch(error){
    next(error);
  }
});


/*************************************************
 *                 Get Functions                 *
 *                                               *
 ************************************************/
// works
router.get("/getLaFamiliaRecipe" ,async (req, res, next) => {
  const user_id = req.session.user_id;
  try{
    const familyRecipes = await utils.getUserFamilyRecipe(user_id);
    var toReturn = new Object();
    toReturn.data = familyRecipes;
    res.status(200).send(toReturn);
  }catch(error){
    next(error);
  }
});

//works
router.get("/getFavoriteRecipe" , async (req, res, next) => {
  const user_id = req.session.user_id;
  try{
    const favoritesIds  = await utils.getUserFavoriteRecipeIds(user_id);
    let recipes = await Promise.all( 
        favoritesIds.map((recipe) =>
        searchUtils.getRecipeInfo(recipe.Recipe_Id , user_id)
        ) 
      );
    recipes = recipes.map((recipe) => recipe.data);
    res.status(200).send({ data: recipes });  
  }catch(error){
    next(error);
  }
  
});

//works
router.get("/getPersonalRecipe" , async(req, res) => { 
  const user_id = req.session.user_id;;
  try{
    console.log("INSIDE TRY");
    const personalRecipes = await utils.getUserPersonalRecipe(user_id);
    var toReturn = new Object();
    toReturn.data = personalRecipes;
    res.status(200).send(toReturn);
    //res.status(200).send(personalRecipes);
  }catch(error){
    console.log(error);
    next(error);
  }
});

//works
router.get("/getLastWatchRecipe" , async(req, res) => {
  const user_id = req.session.user_id;;
  try{
    const lastWatchRecipeIds = await utils.getlastWatchedRecipes(user_id);
    let recipes = await Promise.all( 
      lastWatchRecipeIds.map((recipe) =>
      searchUtils.getRecipeInfo(recipe.Recipe_Id , user_id)
      ) 
    );
    recipes = recipes.map((recipe) => recipe.data);
    var toReturn = new Object();
    toReturn.data = recipes;
    res.status(200).send(toReturn);
  }catch(error){
    next(error);
  }
});
module.exports = router;
