const Food = require("./food")
const $ = require('jquery')

function createTable(foods){
  const foodsTable = $("#food_table tbody")
    foods.forEach(function(food){
      const tableRow = document.createElement("tr")
      $(tableRow).addClass(`food-id-${food.id}`)
      $(tableRow).append(`<td id=fname><div contenteditable>${food.name}</div></td>`)
      $(tableRow).append(`<td id=fcalories><div contenteditable>${food.calories}</div></td>`)
      $(tableRow).append(`<input type="image" class="delete" src="./public/delete_button.png" />`)
      foodsTable.append(tableRow)
    })
}

function addRow(food){
  const foodsTable = $("#food_table tbody")
  const tableRow = document.createElement("tr")
  $(tableRow).addClass(`food-id-${food.id}`)
  $(tableRow).append(`<td id=fname><div contenteditable>${food.name}</div></td>`)
  $(tableRow).append(`<td id=fcalories><div contenteditable>${food.calories}</div></td>`)
  $(tableRow).append(`<input type="image" class="delete" src="./public/delete_button.png" />`)
  foodsTable.prepend(tableRow)
}

function getFoodForm(){
  var name = $(".food-form input[name=food-name]").val()
  var calories = $(".food-form input[name=food-calories]").val()

  return new Food({
    name: name,
    calories: calories
  })
}



$(function(){
  Food.getAllFoods()
  .then(createTable)


  $('table').on('click', '.delete', function(event){
    var food_id = event.target.parentElement.className.split("-").pop()
    $(event.target.parentElement).remove()
    Food.deleteFood(food_id)
  })

  $('table').on('blur', 'div', function(event){
    var id = this.parentElement.parentElement.className.split("-").pop()
    if(this.parentElement.id == "fname"){

      var name = this.innerText
      Food.updateName(id, name)
    }
    else {
        var calories = this.innerText
        Food.updateCalories(id, calories)
      }
  })



  $(".food-form input[type=submit]").on("click", function(event){
    event.preventDefault();
    var name = $(this).parent().find("input[name=food-name]").val()
    var calories = $(this).parent().find("input[name=food-calories]").val()
    if(!name){
      $(".name-error p").append("Please enter a food name")
    } else if (!calories) {
      $(".cal-error p").append("Please enter a food calorie amount")
    } else if (!Number(calories)){
      $(".food-form input[name=food-calories]").after("<p> Food calorie amount must be a number</p>")
    } else {
      var newFood = getFoodForm()
      newFood.createFood().then(function(fullFood){
        addRow(fullFood)
        $( '.food-form' ).each(function(){
          this.reset();
        });
        $('.name-error p').html("")
        $('.cal-error p').html("")
      })
    }
  })
})
