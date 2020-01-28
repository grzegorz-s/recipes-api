import { Router } from "express";
import recipesRouter from "./recipesRouter";
// import categoriesRouter from "./routes/categoriesRouter";
// import authRouter from "./routes/authRouter";

const mainEntry = new Router();
mainEntry.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API 🚀" });
});


export default {
  mainEntry,
  recipesRouter,
};