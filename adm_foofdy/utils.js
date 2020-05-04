module.exports = {
    foundIndexF: function(array, index){
        for(i=0; i<array.length; i++){
            if(array[i] == index)
            return array[i]
        }
    }
}