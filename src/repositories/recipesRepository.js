import db from "./dbConnect";

const allRecipes = function() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM recipes ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);

        return;
      }
      resolve(results.rows);
    });
  });
};

const allRecipesByCategoryId = (categoryId) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM recipes_categories
      INNER JOIN recipes
      ON recipes_categories.recipe_id=recipes.id
      WHERE 
      recipes_categories.category_id=${categoryId}`,
    (error, results) => {
      if (error) {
        reject(error);

        return;
      }
      resolve(results.rows);
    });
  });
};

const singleRecipe = (recipeId) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM recipes WHERE id = $1", [ recipeId ], (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(results.rows);
    });
  });
};

const createRecipe = (newRecipeData) => {
  const { name, category, ingredients, owner, created_at } = newRecipeData;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO recipes (name, category, ingredients, owner, created_at) VALUES ($1, $2, $3, $4, $5)",
      [ name, category, ingredients, owner, created_at ],
      (error) => {
        if (error) {
          reject(error);
        }

        resolve({ status: "success", message: `Recipie for ${name} has been succesfully created.` });
      }
    );
  });
};

const deleteRecipeFromDB = (recipeId, recipeName) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM recipes WHERE id = $1", [ recipeId ], (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ status: "success", message: `Recipie "${recipeName}" with ID: ${recipeId} succesfully deleted ` });
    });
  });
};

const createSet = (changedFileds) =>
  changedFileds.map((el, index) => {
    const someString = `${el} = $${index + 1}`;

    return someString;
  });

const updateExistingRecipe = (changedProperties) => {
  const { id, ...propertiesForSet } = changedProperties;

  const createdSet = createSet(Object.keys(propertiesForSet)).join(",");
  const createdWhere = `id = $${Object.keys(changedProperties).length}`;
  const updatedValues = [ ...Object.values(propertiesForSet), id ];

  const test = `UPDATE recipes SET ${createdSet} WHERE ${createdWhere}`;

  return new Promise((resolve, reject) => {
    db.query(test, updatedValues, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ status: "success", message: `Recipie with ID: ${id} succesfully edited` });
    });
  });
};

export default {
  allRecipes,
  allRecipesByCategoryId,
  singleRecipe,
  createRecipe,
  deleteRecipeFromDB,
  updateExistingRecipe
};
