
import { Router } from "express";
import {isAuthenticated} from "../middleware/authMiddleware";
import recipesService from "../services/recipesService";

const recipesRouter = new Router();

// TODO: handle better routes
recipesRouter.get("/", recipesService.getRecipes); // TODO: should be controller not service
recipesRouter.get("/:id", recipesService.getSingleRecipe);
recipesRouter.post("/", isAuthenticated, recipesService.createNewRecipe);
recipesRouter.put("/:id", isAuthenticated, recipesService.updateRecipe);
recipesRouter.delete("/:id", isAuthenticated, recipesService.deleteRecipe);

export default recipesRouter;
