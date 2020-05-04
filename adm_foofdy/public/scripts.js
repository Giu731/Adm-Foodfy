const receitas = document.querySelectorAll('.receita')
const receitasInfo = document.querySelectorAll('.recipes-info')
const visibility = document.querySelectorAll('.visibility')
const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")   
const ingredients = document.querySelector("#ingredients")
const fieldContainer = document.querySelectorAll(".ingredient")


for(item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}


for(let i=0; i<visibility.length; i++){
    visibility[i].addEventListener("click", function(){
        if(receitasInfo[i].classList.contains("hidden")){
            receitasInfo[i].classList.remove("hidden")
            visibility[i].innerHTML = "ESCONDER"
        }else{
            receitasInfo[i].classList.add("hidden")
            visibility[i].innerHTML = "MOSTRAR"
        }
    })
}

for (let i=0; i < 11; i++){
    receitas[i].addEventListener("click", function(){
        if(i>=6){
            const index = i - 6
            window.location.href = `/receitas/${index}`
        }else{
            window.location.href = `/receitas/${i}`
        }

    })
}

for(conteiner of fieldContainer){
    document.querySelector(".add-ingredient").addEventListener("click", function() {
  
        // Realiza um clone do último ingrediente adicionado
        const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
      
        // Não adiciona um novo input se o último tem um valor vazio
        if (newField.children[0].value == "") return false;
      
        // Deixa o valor do input vazio
        newField.children[0].value = "";
        ingredients.appendChild(newField);
    })
}
