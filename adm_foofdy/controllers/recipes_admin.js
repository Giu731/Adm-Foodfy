const data = require('../data.json')
const fs = require('fs')

exports.index = function(req, res){
    
    return res.render("admin/index", {recipes: data.recipes})
}
exports.create = function(req, res){
    return res.render('admin/create')
}
exports.post = function(req, res){
    const keys = Object.keys(req.body)
    for(key of keys){
        if(req.body[key]==""){
            return res.send("Por favor, preencha todos os campos.")
        }
    }

    let{image, title, author, ingredients, steps, information} = req.body

    const id = Number(data.recipes.length + 1)

    data.recipes.push({
        id, image, title, author, ingredients, steps, information
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")
        return res.redirect("/admin/recipes")
    })

}
exports.show = function(req, res){
    const {id} = req.params
    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })
    if(!foundRecipe) return res.send("Recipe not found")

    const recipe = {
        ...foundRecipe,
    }
    return res.render("admin/show", {recipe})
}
exports.edit = function(req, res){
    const {id} = req.params
    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id
    })
    if(!foundRecipe) return res.send("Recipe not found")

    const recipe = {
        ...foundRecipe,
        id: Number(foundRecipe.id)
    }

    return res.render('admin/edit', {recipe})
}
exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundRecipe = data.recipes.find(function(recipe, foundIndex){
        if(id == recipe.id){
            index = foundIndex
            return true
        }
    })

    if(!foundRecipe) return res.send("Recipe not found!")

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(foundRecipe.id)
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Writing error")
        
        return res.redirect(`/admin/recipes/${id}`)
    })
    
}
exports.delete = function(req, res){
    const {id} = req.body
    const filteredRecipe = data.recipes.filter(function(recipe){
        return recipe.id != id
    })
    data.recipes = filteredRecipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error.")

        return res.redirect("/admin/recipes")
    })
}
