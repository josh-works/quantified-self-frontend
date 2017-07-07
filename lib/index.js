const Food = require("./food")
const $ = require('jquery')

function createTable(foods){
  const foodsTable = $("#food_table tbody")
    foods.forEach(function(food){
      const tableRow = document.createElement("tr")
      $(tableRow).addClass(`food-id-${food.id}`)
      $(tableRow).append(`<td>${food.name}</td>`)
      $(tableRow).append(`<td>${food.calories}</td>`)
      $(tableRow).append(`<input type="image" class="delete" src="./public/delete_button.png" />`)
      foodsTable.append(tableRow)
    })
}

// function deleteRow(event){
//   $(event.target.parent).remove()
// }


$(function(){
  Food.getAllFoods()
  .then(createTable)


  $('table').on('click', function(event){
    if (event.target.className == "delete"){
      var food_id = event.target.parentElement.className.slice(-1)
      $(event.target.parentElement).remove()
      Food.deleteFood(food_id)
    }
  })
})
