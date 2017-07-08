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

function addRow(food){
  const foodsTable = $("#food_table tbody")
  const tableRow = document.createElement("tr")
  $(tableRow).addClass(`food-id-${food.id}`)
  $(tableRow).append(`<td>${food.name}</td>`)
  $(tableRow).append(`<td>${food.calories}</td>`)
  $(tableRow).append(`<input type="image" class="delete" src="./public/delete_button.png" />`)
  foodsTable.append(tableRow)
}

function getFoodForm(){
  var name = $(".food-form input[name=food-name]").val()
  var calories = $(".food-form input[name=food-calories]").val()

  return new Food({
    name: name,
    calories: calories
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

  $(".food-form input[type=submit]").on("click", function(event){
    event.preventDefault();
    var name = $(this).parent().find("input[name=food-name]").val()
    var calories = $(this).parent().find("input[name=food-calories]").val()
    if(!name){
      $(".food-form input[name=food-name]").after("<p>Please enter a food name </p>")
    } else if (!calories) {
      $(".food-form input[name=food-calories]").after("<p> Please enter a food calorie amount </p>")
    } else if (!Number(calories)){
      $(".food-form input[name=food-calories]").after("<p> Food calorie amount must be a number</p>")
    } else {
      var newFood = getFoodForm()
      newFood.createFood().then(function(fullFood){
        addRow(fullFood)
      })
    }
  })
})
