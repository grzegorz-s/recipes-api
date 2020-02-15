
import { Router } from "express";
import categoriesService from "../services/recipesCategoryService";

const categoriesRouter = new Router();

categoriesRouter.get("/", categoriesService.getCategories); //tutaj controller, not service

export default categoriesRouter;


// INSERT INTO categories (name) VALUES ('with meat');
// INSERT INTO categories (name) VALUES ('italian');

// updating recipes_categories
// INSERT INTO recipes_categories (recipe_id, category_id) VALUES(2, 1);
// INSERT INTO recipes_categories (recipe_id, category_id) VALUES(2, 4);
// INSERT INTO recipes_categories (recipe_id, category_id) VALUES(18, 1);


