const receitas = require('../data.js')

exports.home = function(req, res){
    return res.render("home", {items: receitas})
}
exports.sobre = function(req, res){
    return res.render("sobre")
}
exports.receitas = function(req, res){
    return res.render("receitas", {items: receitas})
}
exports.paginaReceita = function (req, res) {
    const recipes = receitas
    const recipeIndex = req.params.index

    // console.log(recipes[recipeIndex])
    return res.render("paginareceita", {item: recipes[recipeIndex]})
}
