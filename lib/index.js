const Food = require("./food")
const $ = require('jquery')
const Meal = require('./models/meal')
const Meals = require('./meals')
var host = require('./config').host




var foodsList = []

Food.getAllFoods()
.then(function (data) {
  data.forEach(function (foodItem) {
    foodsList.push(foodItem)
  })
})


function findMatches(wordToMatch, foods) {
  return foods.filter(food => {
    var regex = new RegExp(wordToMatch, 'gi')
    return food.name.match(regex)
  })
}

function displayFoodMatches() {
  const matchArray = findMatches(this.value, foodsList)
  createTable(matchArray)
}
function displayMealFoodMatches() {
  const matchArray = findMatches(this.value, foodsList)
  createMealFoodsTable(matchArray)
}

const searchInput = document.querySelector('.search')
const mealSearchInput = document.querySelector('.meals_search')

function createTable(foods){
  const foodsTable = $("#food_table tbody").html("")
    foods.forEach(function(food){
      const tableRow = document.createElement("tr")
      $(tableRow).addClass(`food-id-${food.id}`)
      $(tableRow).append(`<td id=fname><span contenteditable>${food.name}</span></td>`)
      $(tableRow).append(`<td id=fcalories><span contenteditable>${food.calories}</span></td>`)
      $(tableRow).append(`<input type="image" class="delete" src="./public/delete_button.png" />`)
      foodsTable.append(tableRow)
    })
}



function createMealFoodsTable(foods){
  const mealFoodsTable = $("#meal_food_table tbody").html("")
    foods.forEach(function(food){
      const tableRow = document.createElement("tr")
      $(tableRow).addClass(`food-id-${food.id}`)
      $(tableRow).append(`<td id="checkbox"><input type='checkbox' / ></td>`)
      $(tableRow).append(`<td id=fname>${food.name}</td>`)
      $(tableRow).append(`<td id=fcalories>${food.calories}</td>`)
      mealFoodsTable.append(tableRow)
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

 // sorting foodrows
function sortFoodRows(foodRowsArray, style) {
  return foodRowsArray.sort(function (a, b) {
    var row1 = Number(a.children.fcalories.innerText)
    var row2 = Number(b.children.fcalories.innerText)
    if (style === "default") {
      $("#sort_by_calories")[0].dataset.sort = "asc"
      return row1 - row2
    } else if (style === "asc") {
      $("#sort_by_calories")[0].dataset.sort = "desc"
      return row2 - row1
    }
  })
}

function buildSortedMealTable(data) {
  $('#meal_food_table tbody').html("").append(data)
}


$(function(){
  Food.getAllFoods()
  .then(createTable)

  Food.getAllFoods()
  .then(createMealFoodsTable)

  searchInput.addEventListener('change', displayFoodMatches)
  searchInput.addEventListener('keyup', displayFoodMatches)
  mealSearchInput.addEventListener('change', displayMealFoodMatches)
  mealSearchInput.addEventListener('keyup', displayMealFoodMatches)


  $('table').on('click', '.delete', function(event){
    var food_id = event.target.parentElement.className.split("-").pop()
    $(event.target.parentElement).remove()
    Food.deleteFood(food_id)
  })

  $('table').on('click', '.meal-delete', function(event){
    var mealName = event.target.parentElement.parentElement.parentElement.id.split("_")[0]
    var food_id = event.target.parentElement.parentElement.dataset.id
    Meal.deleteFood(food_id, mealName).then(function(data){
      Meal.reloadAll()
    })
  })

  $('table').on('blur', 'div', function(event){
    var id = this.parentElement.parentElement.className.split("-").pop()
    if(this.parentElement.id == "fname"){
      var name = this.innerText
      Food.updateName(id, name).then(function () {
        Meal.reloadAll()
        Food.getAllFoods()
        .then(createMealFoodsTable)
      })

    }
    else {
        var calories = this.innerText
        Food.updateCalories(id, calories).then(function () {
          Meal.reloadAll()
          Food.getAllFoods()
          .then(createMealFoodsTable)
        })
      }

  })

  // adding foods to meal
  $('#meal_selections').on('click', function (event) {
    event.preventDefault();
    var checkedFoods = Array.from($('#meal_food_table').find('input:checked'))
    checkedFoods.forEach(function(foodItem) {
      foodItem.checked = false;
      var foodName = foodItem.parentElement.nextSibling.innerHTML
      var mealName = event.target.dataset.meal
      Meal.addFoodsToMeal(foodName, mealName)
      .then(function() {
        Meal.reloadAll()
      })
    })


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
        // refresh mealfoods list
        Food.getAllFoods()
        .then(createMealFoodsTable)
      })
    }
  })

  $("#sort_by_calories").on("click", function(event) {
    event.preventDefault()
    var sortStyle = this.dataset.sort

    var foodRows = Array.from($('#meal_food_table tbody tr'))
    var sortedData = sortFoodRows(foodRows, sortStyle)
    if (sortStyle === "desc") {
      Food.getAllFoods()
      .then(createMealFoodsTable).then(function () {
        $("#sort_by_calories")[0].dataset.sort = "default"

      })
    } else {
      buildSortedMealTable(sortedData)

    }
  })
})
