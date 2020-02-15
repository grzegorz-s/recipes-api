import categoriesDB from "../repositories/recipesCategoryRepository";

const { allCategories, allCategoriesByRecipeId } = categoriesDB;

const getAllCategories = (res) => {
  return allCategories()
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      throw err;
    });
};

const getCategoriesByRecipeId = (recipeId, res) => {
  return allCategoriesByRecipeId(recipeId)
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      throw err;
    });
};

const getCategories = (req, res) => {
  const {recipeId} = req.query;
  const categories = recipeId > 0 ? getCategoriesByRecipeId(recipeId, res) : getAllCategories(res);

  return categories;
};

export default {
  getCategories,
};
