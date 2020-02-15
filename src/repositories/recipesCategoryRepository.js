import db from "./dbConnect";

const allCategories = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM categories ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);

        return;
      }
      resolve(results.rows);
    });
  });
};

const allCategoriesByRecipeId = (recipeId) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM recipes_categories
      INNER JOIN categories
      ON recipes_categories.category_id=categories.id
      WHERE 
      recipes_categories.recipe_id=${recipeId}`,
    (error, results) => {
      if (error) {
        reject(error);

        return;
      }
      resolve(results.rows);
    });
  });
};

export default {
  allCategories,
  allCategoriesByRecipeId
};