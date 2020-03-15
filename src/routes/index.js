import express, { Router } from "express";
import recipesRouter from "./recipesRouter";
import categoriesRouter from "./categoriesRouter";
import authRouter from "./authRouter";

const app = express();

const mainEntry = new Router();
mainEntry.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API 🚀" });
});


app.use("/", mainEntry);
app.use("/recipes", recipesRouter);
app.use("/categories", categoriesRouter);
app.use("/user", authRouter);

export default app;
