
import { Router } from "express";
import recipesService from "../services/recipesService";

const recipesRouter = new Router();

// handle better routes
recipesRouter.get("/", recipesService.getRecipes); //tutaj controller, not service
recipesRouter.get("/:id", recipesService.getSingleRecipe);
// recipesRouter.get("/catgory/:id", recipesService.getRecipesByCategory);
recipesRouter.post("/", recipesService.createNewRecipe);
recipesRouter.put("/:id", recipesService.updateRecipe);
recipesRouter.delete("/:id", recipesService.deleteRecipe);

export default recipesRouter;