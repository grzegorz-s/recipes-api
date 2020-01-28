import recipesDB from "../repositories/recipesRepository";

const {
  allRecipes,
  // getLatestLanguages
} = recipesDB;

// const getRecipes = (request, response) => {
//   allRecipes((error, results) => {
//     if (error) throw error;

//     return response.status(200).json(results.rows);
//   });
// };

const getRecipes = (req, res) => {
  return allRecipes()
    .then(response => res.status(200).json(response))
    .catch(err => { 
      throw err;
    });
};

export default {
  getRecipes,
};