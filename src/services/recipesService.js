import jwt from "jsonwebtoken";
import recipesDB from "../repositories/recipesRepository";

const jwtKey = "secret_jwt_key_stored_in_env";

const { allRecipes, allRecipesByCategoryId, singleRecipe, createRecipe, updateExistingRecipe, deleteRecipeFromDB } = recipesDB;

const getAllRecipes = res => {
  return allRecipes()
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      throw err;
    });
};
const getAllRecipesByCategoryId = (categoryId, res) => {
  return allRecipesByCategoryId(categoryId)
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      throw err;
    });
};

const getRecipes = async (req, res, next) => {

  // TODO create function and move as middleware
  // save decoded user to express-session?
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(403).json({success: false, message: "Must be loged in to execute this action"});
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, jwtKey);
  } catch (error) {
    res.status(403).json({success: false, message: "Your session is expired. Please login in."});
    return;
  }

  console.log({decodedToken});

  const {categoryId} = req.query;
  const recipes = categoryId > 0 ? getAllRecipesByCategoryId(categoryId, res) : getAllRecipes(res);
  
  return recipes;
};

const getSingleRecipe = (req, res) => {
  const { id: recipeId } = req.params;

  return singleRecipe(recipeId)
    .then((response) => {
      if (!response.length) return res.status(204).send();
      return res.status(200).json(response);
    })
    .catch((err) => {
      throw err;
    });
};

const createNewRecipe = (req, res) => {
  const newRecipeData = req.body;

  return createRecipe(newRecipeData).then((response) => res.status(200).json(response)).catch((err) => {
    throw err;
  });
};

const updateRecipe = (req, res) => {
  const updatedAt = new Date().toISOString();
  // extracting only allowed params
  const { name, category, ingredients, owner } = req.body;
  const { id } = req.params;


  const changedProperties = JSON.parse(JSON.stringify(
    {
      name, category, ingredients, owner,
      updated_at: updatedAt,
      id
    }
  ));

  return updateExistingRecipe(changedProperties)
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      throw err;
    });
};

const deleteRecipe = (req, res) => {
  const { id: recipeId } = req.params;

  const recipeInfo = singleRecipe(recipeId);
  const recipieToRemove = recipeInfo
    .then((result) => {
      if (!result.length) return res.status(204).send();

      const { name: recipeName } = result[0];

      return deleteRecipeFromDB(recipeId, recipeName);
    })
    .catch((err) => {
      throw err;
    });

  return Promise.resolve(recipieToRemove).then((result) => {
    res.status(200).json(result);
  });
};

export default {
  getRecipes,
  getSingleRecipe,
  createNewRecipe,
  updateRecipe,
  deleteRecipe
};
