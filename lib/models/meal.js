var $ = require('jquery');
var host = require('../config').host


function Meal(data, calories) {
  this.foodName = data.food_name,
  this.foodCalories = data.food_calories
  this.id = data.food_id
  this.totalCalories = calories
}

Meal.getMeal = function (meal) {
  return $.getJSON(host + meal)
}

Meal.prototype.toHTML = function() {
  return `<tr class="meal-food" data-id="${this.id}">
            <td>${this.foodName}</td>
            <td class="mealFoodCalories" data-calories=${this.foodCalories}>${this.foodCalories}</td>
            <td><input type="image" class="meal-delete" src="./public/delete_button.png" /></td>
          </tr>
        `
}

Meal.allFoodsToHTML = function (meal) {
  return this.getMeal(meal)
  .then(meals => {
    return meals.map(meal => {
      return new Meal(meal)
    })
  }).then(breakfast_foods => {
    return breakfast_foods.map(meal => {
      return meal.toHTML()
    })
  })
}

Meal.deleteFood = function(foodId, mealName){
  var data = { id: foodId }
  return $.ajax({
    method: 'DELETE',
    url: host + mealName,
    data: data
  })
}

Meal.addFoodsToMeal = function (foodName, mealName) {
  var data = { name: foodName }
  return $.ajax({
    method: 'PUT',
    url: host + mealName,
    data: data
  })
}

Meal.updateTable = function(mealName, length) {
  Meal.allFoodsToHTML(mealName)
  .then(data => {
    $(`#${mealName}_meals_table`).html("").append(data)
  })
}

Meal.remainingCalories = function(foodCaloriesArray, totalCalories)  {

  var calorieCount = 0
  for (var i = 0; i < foodCaloriesArray.length; i++) {
    calorieCount += foodCaloriesArray[i]
  }
  return totalCalories - calorieCount
}

Meal.findCalories = function(meal){
  var cells = $(`#${meal}_meals_table .mealFoodCalories`).map(function(cell){
    return Number(this.dataset.calories)
  })
  return cells
}

Meal.findTotalCalories = function(){
  var totals = $('.calorie_total')
  var calories = totals.map(function(cell){
    return Number(this.innerText)
  })
  return Array.from(calories)
}

Meal.sumCalories = function(array){
  var total = array.reduce(function(sum, number){
    return sum + number
  }, 0)
  return total
}

Meal.updateTotalTable = function(){
  var caloriesConsumed = Meal.sumCalories(Meal.findTotalCalories())
  var remainingCalories = 2000 - caloriesConsumed
  let f = (remainingCalories >= 0) ? ('negative'):('positive')
  let l = (remainingCalories >= 0) ? ('positive'):('negative')
    $('.totals_table #consumed').html(caloriesConsumed)
    $('.totals_table #remaining').removeClass(f).addClass(l).html(remainingCalories)
}

Meal.rebuildTables = function(mealName, calories, data){
  $(`#${mealName}_meals_table`).html("").append(data)
  var remaining = Meal.findCalories(mealName)
  var arrayCalories = Array.from(remaining);
  var remainingCals = Meal.remainingCalories(arrayCalories, calories)
  var total = Meal.sumCalories(arrayCalories)
  if(remainingCals >= 0 ){
    $(`#${mealName}_table td.calorie_total`).html(total)
    $(`#${mealName}_table td.calorie_remaining`).removeClass("negative").addClass("positive").html(remainingCals)
  } else {
    $(`#${mealName}_table td.calorie_total`).html(total)
    $(`#${mealName}_table td.calorie_remaining`).removeClass("positive").addClass("negative").html(remainingCals)
  }
}

const meals = {
  "breakfast": 400,
  "lunch": 600,
  "dinner": 800,
  "snack": 200
}

Meal.reloadAll = function() {
  Object.keys(meals).forEach(function(meal){

    Meal.allFoodsToHTML(meal, meals[meal])
    .then(function(data) {
      Meal.rebuildTables(meal, meals[meal], data)
    }).then(function(){
      Meal.updateTotalTable()
    })
  })
}


module.exports = Meal
