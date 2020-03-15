import recipesDB from "../repositories/recipesRepository";

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

const getRecipes = async (req, res) => {
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

  // TODO: create relation table for recipie and author
  console.log(`Recipie created by ${req.user}`);
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
