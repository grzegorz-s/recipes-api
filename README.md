# Sample Node.js API

It's an express app with sample recipes Rest API implentation.
In order to run you need to set up locally [PostgreSQL]('https://www.postgresql.org/').
More about needed tables [below](#Database).
Node on machine is also required: `>=8.16.1`.

## Setup

- clone repository
- create [database](#Database) and tables
- install all dependecies: `yarn install`
- start the app: `yarn start`

## Database

Consists of four tables. All listed below with query how to set them up.

<details open>
<summary>recipes</summary>

```sql
CREATE TABLE recipes (ID SERIAL PRIMARY KEY,name VARCHAR(255),category VARCHAR(255),ingredients VARCHAR(255),created_at timestamptz,updated_at timestamptz,owner VARCHAR(100));
```
</details>

<details open>
<summary>categories</summary>

```sql
CREATE TABLE categories (ID SERIAL PRIMARY KEY,name VARCHAR(255));
```
</details>

<details open>
<summary>recipes_categories</summary>

```sql
CREATE TABLE recipes_categories (ID SERIAL PRIMARY KEY,recipe_id integer, category_id integer);
```
</details>

<details open>
<summary>users</summary>

```sql
CREATE TABLE users(
   user_id serial PRIMARY KEY,
   username VARCHAR (50) UNIQUE NOT NULL,
   password VARCHAR (255) NOT NULL,
   email VARCHAR (355) UNIQUE NOT NULL,
   created_at TIMESTAMP NOT NULL,
   last_login TIMESTAMP);
```
</details>

## Endpoints
### User

<details open>
<summary>Register</summary>

```json
POST /user/register

// request body
{
	"username": "validaName",
	"email": "validEmail",
	"password": "password"
}
```
</details>

<details open>
<summary>Login</summary>

```json
GET /user/login

// request body
{
	"email": "validEmail",
	"password": "password"
}

// returned
{
    "succes": true,
    "message": "success",
    "token": "validJWTtoke"
}
```
</details>


<details>
<summary>Logout</summary> 

**not implemented**
</details>

<details>
<summary>Reset password</summary>

**not implemented**
</details>
<br>

***

### Recipes

<details open>
<summary>Get all recipes</summary>

```json
GET /recipes
```

</details>

<details open>
<summary>Get single recipe</summary>

```json
GET /recipes/:id
```

</details>

<details open>
<summary>Get recipes by category id</summary>
You  can list all recipies that match specific category id.

> Relation for categories and recipes are not implemented yet (need to be done manually)
If you want to do it, first create couple of recipes and categories and run some query to create relations e.g `INSERT INTO recipes_categories (recipe_id, category_id) VALUES(18, 1);`

```json
GET /recipes/

// request query params
{
  categoryId: 4
}
```

</details>

<details open>
<summary>Create recipe</summary>

This route **is restricted**. You must first login to get the token:

```json
POST /recipes

// request body
{
  "name": "",
  "category": "", // dynamic binding with category table is not implemented
  "ingredients": "pasta, beef meet, tomatos, red onion, pinch of cinnamon",
  "created_at": "timestamp"
}

// request header
{
  "Content-Type": "application/json",
    "x-access-token": "JWTtoken", // you can pass x-access-token or authorization
    "authorization": "JWTtoken" // you can pass x-access-token or authorization
}

```

</details>

<details open>
<summary>Update recipe</summary>

This route **is restricted**. You must first login to get the token.
You can update any element you need. You don't need to update whole object, single value is ok too.

```json
PUT /recipes/:id

// request body
{
  "name": "",
  "category": "", // dynamic binding with category table is not implemented
  "ingredients": "pasta, beef meet, tomatos, red onion, pinch of cinnamon",
  "created_at": "timestamp"
}

// request header
{
  "Content-Type": "application/json",
    "x-access-token": "JWTtoken", // you can pass x-access-token or authorization
    "authorization": "JWTtoken" // you can pass x-access-token or authorization
}

```

</details>


<details open>
<summary>Delete recipe</summary>

This route **is restricted**. You must first login to get the token:

```json
DELETE /recipes/:id

// request header
{
  "Content-Type": "application/json",
    "x-access-token": "JWTtoken", // you can pass x-access-token or authorization
    "authorization": "JWTtoken" // you can pass x-access-token or authorization
}

```

### Categories

<details open>
<summary>List all categories</summary>


```json
GET /categories/

```
</details>

<details open>
<summary>List all categories for specific recipe</summary>
You  can list all categories that match specific recipe.

> Relation for categories and recipes are not implemented yet (need to be done manually)
If you want to do it, first create couple of recipes and categories and run some query to create relations e.g `INSERT INTO recipes_categories (recipe_id, category_id) VALUES(18, 1);`

```json
GET /categories/

// request query params
{
  reipeId: 4
}
```
</details>
