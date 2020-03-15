
import { Router } from "express";
import categoriesService from "../services/recipesCategoryService";

const categoriesRouter = new Router();

// TODO: getCategories should be in controller, not service
categoriesRouter.get("/", categoriesService.getCategories); 

export default categoriesRouter;


// updating recipes_categories
// INSERT INTO recipes_categories (recipe_id, category_id) VALUES(2, 1);
// INSERT INTO recipes_categories (recipe_id, category_id) VALUES(2, 4);
// INSERT INTO recipes_categories (recipe_id, category_id) VALUES(18, 1);
