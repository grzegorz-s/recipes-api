import { Pool } from "pg";

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
} = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

const getRecipes = (request, response) => {
  pool.query("SELECT * FROM recipes ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getRecipeById = (request, response) => {
  const { id } = request.params;
  const recipeId = parseInt(id);
  
  pool.query("SELECT * FROM recipes WHERE id = $1", [recipeId], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createRecipe = (request, response) => {
  const {name, category, ingredients, owner, created_at} = request.body;
  
  pool.query(
    "INSERT INTO recipes (name, category, ingredients, owner, created_at) VALUES ($1, $2, $3, $4, $5)",
    [name, category, ingredients, owner, created_at],
    (error) => {
      if (error) {
        throw error;
      }
      
      response.status(201).json({ status: "success", message: "Added." });
    });
};

const updateRecipe = (request, response) => {
  const { id } = request.params;
  const recipeId = parseInt(id);
  const {name, category, ingredients, owner, updated_at} = request.body;
  
  

  pool.query(
    // name = CASE WHEN $1 IS NULL OR $1 = '' THEN name ELSE $1 END,
    `UPDATE recipes
      SET 
        name = $1,
        category = $2, 
        ingredients = $3, 
        owner = $4, 
        updated_at = $5
      WHERE
        id = $6`,
    [name, category, ingredients, owner, updated_at, recipeId],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Recipe modified with ID: ${recipeId}`);
    }
  );
};


const deleteRecipe = (request, response) => {
  const { id } = request.params;
  const recipeId = parseInt(id);

  pool.query("DELETE FROM recipes WHERE id = $1", [recipeId], (error) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};


export default {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
