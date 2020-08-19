const DBcontroller = require("../../DataBase/DBcontroller");

/*************************************************
 *                 Add Functions                 *
 *                                               *
 ************************************************/
async function userWatchRecipe(Recipe_Id, User_Id) {
  try {
    const userCountWatch = await DBcontroller.execQuery(
      `SELECT * FROM UserWatchedRecipe WHERE ` +
        `Recipe_Id = '` +
        Recipe_Id +
        `' ` +
        `And User_Id = '` +
        User_Id +
        `'`
    );
    if (userCountWatch.length == 0) {
      try {
        await DBcontroller.execQuery(
          `INSERT INTO UserWatchedRecipe ` +
            `VALUES ( '` +
            User_Id +
            `' , '` +
            Recipe_Id +
            `' , ` +
            Date.now() +
            ` ) `
        );
      } catch (error) {
        next(error);
      }
    } else {
      try {
        await DBcontroller.execQuery(
          `UPDATE UserWatchedRecipe SET ` +
            `Watched_Date = ` +
            Date.now() +
            ` ` +
            `WHERE User_Id = \'` +
            User_Id +
            `\' AND Recipe_Id = \'` +
            Recipe_Id +
            `\'`
        );
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
}
exports.addRecipeToFavorite = async function (Recipe_Id, User_Id) {
  try {
    const userCountFavorite = await DBcontroller.execQuery(
      `SELECT * FROM UserSavedRecipe WHERE ` +
        `Recipe_Id = '` +
        Recipe_Id +
        `' ` +
        `And User_Id = '` +
        User_Id +
        `'`
    );
    if (userCountFavorite.length == 0) {
      try {
        await DBcontroller.execQuery(
          `INSERT INTO UserSavedRecipe ` +
            `VALUES ( '` +
            User_Id +
            `' , '` +
            Recipe_Id +
            `' )`
        );
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};
/*************************************************
 *                 Get Functions                 *
 *                                               *
 ************************************************/
async function getUserFamilyRecipe(User_Id) {
  try {
    let queryRecipesIds =
      `SELECT * FROM FamilyRecipes ` + `WHERE User_Id = \'` + User_Id + `\'`;
    result_family_recipe = await DBcontroller.execQuery(queryRecipesIds);

    result_family_recipe = await Promise.all(
      result_family_recipe.map((family_recipe) => {
        try {
          let allInfoOfRecipe = {};
          allInfoOfRecipe = getFamilyRecipeInfoById(
            family_recipe,
            family_recipe.Recipe_Id
          );
          // .then(allInfoOfRecipe.family = extractFamilyRecipe(family_recipe) );
          return allInfoOfRecipe;
        } catch (error) {
          next(error);
        }
      })
    );
    return result_family_recipe;
  } catch (error) {
    next(error);
  }
}
async function getFamilyRecipeInfoById(family_recipe, Recipe_Id) {
  try {
    var allInfoOfRecipe = createFamilyRecipObj();
    allInfoOfRecipe = await getRecipeInfoById(Recipe_Id);
    allInfoOfRecipe = extractFamilyRecipe(family_recipe , allInfoOfRecipe);
    let allPhotosRecipe = await getPhotoOfRecipe(Recipe_Id);
    allInfoOfRecipe = extractPhotosOfRecipe(allPhotosRecipe , allInfoOfRecipe);
    return allInfoOfRecipe;
  } catch (error) {
    next(error);
  }
}
async function getPhotoOfRecipe(Recipe_Id) {
  try {
    let photos =
      `SELECT * FROM PhotosRecipe ` + `WHERE Recipe_Id = \'` + Recipe_Id + `\'`;
    photosResult = await DBcontroller.execQuery(photos);
    return photosResult;
  } catch (error) {
    next(error);
  }
}
async function getUserPersonalRecipe(User_Id) {
  try {
    let queryRecipesIds =
      `SELECT Recipe_Id FROM PersonalRecipe WHERE User_Id = \'` +
      User_Id +
      `\'`;
    personalRecipesIds = await DBcontroller.execQuery(queryRecipesIds);

    personalRecipesIds = await Promise.all(
      personalRecipesIds.map((Recipe_Id) =>
        getRecipeInfoById(Recipe_Id.Recipe_Id)
      )
    );
    return personalRecipesIds;
  } catch (error) {
    next(error);
  }
}
async function getMetaInfo(Recipe_Id) {
  let queryPreview =
    `SELECT r.Id, r.Name , pr.Photo_Link , r.MakingTime  , r.Popularity , r.Servings , r.Vegan , r.Vegetarian , r.Gluten ` +
    `FROM Recipes r LEFT JOIN PhotosRecipe pr ON r.Id = pr.Recipe_Id ` +
    `WHERE r.Id = \'` +
    Recipe_Id +
    `\'`;
  try {
    const personalRecipe = await DBcontroller.execQuery(queryPreview);
    return personalRecipe;
  } catch (error) {
    next(error);
  }
}
async function getRecipeIngredientInfo(Recipe_Id) {
  let queryIngredientsAndQuantity =
    `SELECT i.Name, i.Quantity , i.Unit_Measure ` +
    `FROM IngredientAndQuantity i ` +
    `WHERE i.Recipe_Id = \'` +
    Recipe_Id +
    `\'`;
  try {
    const ingredients = await DBcontroller.execQuery(
      queryIngredientsAndQuantity
    );
    return ingredients;
  } catch (error) {
    next(error);
  }
}
async function getRecipeStepInfo(Recipe_Id) {
  let querySteps =
    `SELECT s.Step_Number, s.Description ` +
    `FROM Steps s ` +
    `WHERE s.Recipe_Id = \'` +
    Recipe_Id +
    `\'`;
  try {
    const steps = await DBcontroller.execQuery(querySteps);
    return steps;
  } catch (error) {
    next(error);
  }
}

async function getRecipeInfoById(Recipe_Id) {
  try {
    var allInfoOfRecipe = createRecipObj();
    let personalRecipe = await getMetaInfo(Recipe_Id);
    allInfoOfRecipe = extractRecipeInfo(personalRecipe , allInfoOfRecipe);
    let ingredientInfo = await getRecipeIngredientInfo(Recipe_Id);
    allInfoOfRecipe = extractRecipeIngredient(ingredientInfo , allInfoOfRecipe);
    let stepsInfo = await getRecipeStepInfo(Recipe_Id);
    allInfoOfRecipe = extractRecipeSteps(stepsInfo , allInfoOfRecipe);
    return allInfoOfRecipe[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getUserFavoriteRecipeIds(User_Id) {
  try {
    const favoritesIds = await DBcontroller.execQuery(
      `SELECT Recipe_Id FROM UserSavedRecipe ` +
        `WHERE User_Id = \'` +
        User_Id +
        `\'`
    );
    return favoritesIds;
  } catch (error) {
    next(error);
  }
}
async function getlastWatchedRecipes(User_Id) {
  try {
    const resultLastWatch = await DBcontroller.execQuery(
      `SELECT TOP 3 Recipe_Id ` +
        `FROM UserWatchedRecipe ` +
        `WHERE User_Id= \'` +
        User_Id +
        `\' ` +
        `ORDER BY Watched_Date DESC `
    );
    return resultLastWatch;
  } catch (error) {
    next(error);
  }
}

/*************************************************
 *              Extact Functions                 *
 *                                               *
 ************************************************/
function extractRecipeInfo(recipe_Info , recipObj) {
  return recipe_Info.map((recipe_info) => {
    const {
      Id,
      Name,
      MakingTime,
      Popularity,
      Vegetarian,
      Vegan,
      Gluten,
      Photo_Link,
      Servings,
    } = recipe_info;

      recipObj.id = Id;
      recipObj.Name = Name;
      recipObj.timeMinutes = MakingTime;
      recipObj.likes = Popularity;
      recipObj.vegetarian = Vegetarian;
      recipObj.vegan = Vegan;
      recipObj.glutenFree = Gluten;
      recipObj.imageLink = Photo_Link;
      recipObj.servings = Servings;
      recipObj.saved = 0;
      recipObj.watched = 1;
      return recipObj;
  });
}
function extractRecipeIngredient(recipes_Ingredient , recipObj) {
  let i = 1;
  recipes_Ingredient.map((recipes_Ingredient) => {
    const { Name, Quantity, Unit_Measure } = recipes_Ingredient;
    recipObj[0].ingridiantsList.push({
      id: i, 
      original: Quantity + Unit_Measure + Name
    });
  });
  return recipObj;
}
function extractRecipeSteps(recipes_Step , recipObj) {
  recipes_Step.map((recipes_Step) => {
    const { Step_Number, Description } = recipes_Step;

    recipObj[0].instruction[0].steps.push( {
      number: Step_Number,
      step: Description,
      ingredients: [],
    });
  });
  return recipObj;
}
function extractFamilyRecipe(family_recipe , recipeObj) {
  // return family_recipe.map((family_recipe) => {
  const { Recipe_Id, Recipe_Owner, RecipePeriod } = family_recipe;
  //recipeObj.Recipe_Id: Recipe_Id,
  recipeObj.RecipeOwner = Recipe_Owner;
  recipeObj.RecipePeriod = RecipePeriod;
  return recipeObj;
}
function extractPhotosOfRecipe(recipe_photo , recipObj) {
  recipObj.photos = [];
   recipe_photo.map((recipe_photo) => {
    const { Photo_Link } = recipe_photo;
    recipObj.photos.push(Photo_Link);
  });
  return recipObj;
}

function createRecipObj(){
  var obj = {
    id: "",
    Name: "",
    timeMinutes: "",
    likes: "",
    servings: "",
    vegetarian: "",
    vegan: "",
    glutenFree: "",
    imageLink: "",
    ingridiantsList: [],
    instruction: [{
      name: "",
      steps: []
    }]
  }
  return obj;
}

function createFamilyRecipObj(){
  var obj = {
    id: "",
    Name: "",
    timeMinutes: "",
    likes: "",
    servings: "",
    vegetarian: "",
    vegan: "",
    glutenFree: "",
    imageLink: "",
    RecipeOwner: "",
    RecipePeriod: "",
    ingridiantsList: [],
    photos: [],
    instruction: [{
      name: "",
      steps: []
    }]
  }
  return obj;

}

exports.checkIdOnDb = async function (User_Id) {
  const user = await DBcontroller.execQuery(
    `SELECT * from users where user_id = '${User_Id}'`
  );
  if (user != null && user.length > 0) {
    return user[0];
  } else {
    return null;
  }
};

exports.getlastWatchedRecipes = getlastWatchedRecipes; // V
exports.userWatchRecipe = userWatchRecipe; // V
exports.getUserFavoriteRecipeIds = getUserFavoriteRecipeIds; // V
exports.getUserPersonalRecipe = getUserPersonalRecipe; //V
exports.getUserFamilyRecipe = getUserFamilyRecipe; // V
