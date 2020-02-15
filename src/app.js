const bodyParser = require("body-parser");
import express from "express";

import appRouter from "./routes";

const app = express();
const port = 3030;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", appRouter.mainEntry);
app.use("/recipes", appRouter.recipesRouter);
app.use("/categories", appRouter.categoriesRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});