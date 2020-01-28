
import { Router } from "express";
import db from "../queries";
import recipesService from "../services/recipesService";

const recipesRouter = new Router();

recipesRouter.get("/", recipesService.getRecipes);
recipesRouter.get("/:id", db.getRecipeById);
recipesRouter.post("/", db.createRecipe);
recipesRouter.put("/:id", db.updateRecipe);
recipesRouter.delete("/:id", db.deleteRecipe);

export default recipesRouter;