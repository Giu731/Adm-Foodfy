const data = require('../data.json')
const fs = require('fs')
const {foundIndexF} = require('../utils.js')

exports.index = function(req, res){
   
    return res.render("admin/index", {recipes: data.recipes})
}
exports.create = function(req, res){
    return res.render('admin/create')
}
//post
exports.post = function(req, res){
    const keys = Object.keys(req.body)
    // Validação dos campos
    for(key of keys){
        if(req.body[key]==" "){
            return res.send("Por favor, preencha todos os campos.")
        }
    }

    // let{image, ingredients, steps, information} = req.body

    // const id = Number(data.recipes.length + 1)

    // data.recipes.push({
    //     id, image, ingredients, steps, information
    // })

    // fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    //     if(err) return res.send("Write file error!")
    //     return res.redirect("admin/index")
    // })
    return res.send(req.body)

}
// Show
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
// Edit
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
// Update
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
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Writing error")
        
        return res.redirect(`/admin/recipes/${id}`)
    })
    
}
// Delete
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
