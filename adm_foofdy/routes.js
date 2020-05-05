const express = require('express')
const routes = express.Router()
const recipes = require('./controllers/recipes_admin')
const foodfy = require('./controllers/foodfy')

routes.get("/", foodfy.home)
routes.get("/sobre", foodfy.sobre)
routes.get("/receitas", foodfy.receitas)
routes.get("/receitas/:index", foodfy.paginaReceita)

routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)


module.exports = routes