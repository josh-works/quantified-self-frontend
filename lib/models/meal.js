var $ = require('jquery');
var host = require('../config').host


function Meal(data, calories) {
  this.foodName = data.food_name,
  this.foodCalories = data.food_calories
  this.id = data.food_id
  this.totalCalories = calories
}

Meal.getMeal = function (meal) {
  return $.getJSON(`${host}/api/v1/${meal}`)
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
    url: 'http://localhost:3000/api/v1/' + mealName,
    data: data
  })
}

Meal.addFoodsToMeal = function (foodName, mealName) {
  var data = { name: foodName }
  return $.ajax({
    method: 'PUT',
    url: 'http://localhost:3000/api/v1/' + mealName,
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
  var remainingCalories = Meal.remainingCalories(caloriesConsumed, 2000)

  if (remainingCalories >= 0) {
    $('.totals_table #consumed').html(caloriesConsumed)
    $('.totals_table #remaining').addClass("positive").html(remainingCalories)
  } else {
    $('.totals_table #consumed').html(caloriesConsumed)
    $('.totals_table #remaining').addClass("negative").html(remainingCalories)
  }
}

Meal.reloadAll = function() {

  Meal.allFoodsToHTML('breakfast', 400)
  .then(data => {
    $('#breakfast_meals_table').html("").append(data)
    var remaining = Meal.findCalories("breakfast")
    var arrayCalories = Array.from(remaining);
    var remainingCals = Meal.remainingCalories(arrayCalories, 400)
    var total = Meal.sumCalories(arrayCalories)
    if(remainingCals >= 0 ){
      $('#breakfast_table td.calorie_total').html(total)
      $('#breakfast_table td.calorie_remaining').addClass("positive").html(remainingCals)
    } else {
      $('#breakfast_table td.calorie_total').html(total)
      $('#breakfast_table td.calorie_remaining').addClass("negative").html(remainingCals)
    }
}).then(function(){
  Meal.updateTotalTable()
})

  Meal.allFoodsToHTML('lunch', 600)
  .then(data => {
    $('#lunch_meals_table').html("").append(data)
    var remaining = Meal.findCalories("lunch")
    var arrayCalories = Array.from(remaining);
    var remainingCals = Meal.remainingCalories(arrayCalories, 600)
    var total = Meal.sumCalories(arrayCalories)
    if(remainingCals >= 0 ){
      $('#lunch_table td.calorie_total').html(total)
      $('#lunch_table td.calorie_remaining').addClass("positive").html(remainingCals)
    } else {
      $('#lunch_table td.calorie_total').html(total)
      $('#lunch_table td.calorie_remaining').addClass("negative").html(remainingCals)
    }
  }).then(function(){
    Meal.updateTotalTable()
  })

  Meal.allFoodsToHTML('dinner', 800)
  .then(data => {
    $('#dinner_meals_table').html("").append(data)
    var remaining = Meal.findCalories("dinner")
    var arrayCalories = Array.from(remaining);
    var remainingCals = Meal.remainingCalories(arrayCalories, 800)
    var total = Meal.sumCalories(arrayCalories)
    if(remainingCals >= 0 ){
      $('#dinner_table td.calorie_total').html(total)
      $('#dinner_table td.calorie_remaining').addClass("positive").html(remainingCals)
    } else {
      $('#dinner_table td.calorie_total').html(total)
      $('#dinner_table td.calorie_remaining').addClass("negative").html(remainingCals)
    }
  }).then(function(){
    Meal.updateTotalTable()
  })


  Meal.allFoodsToHTML('snack', 200)
  .then(data => {
    $('#snack_meals_table').html("").append(data)
    var remaining = Meal.findCalories("snack")
    var arrayCalories = Array.from(remaining);
    var remainingCals = Meal.remainingCalories(arrayCalories, 200)
    var total = Meal.sumCalories(arrayCalories)
    if(remainingCals >= 0 ){
      $('#snack_table td.calorie_total').html(total)
      $('#snack_table td.calorie_remaining').addClass("positive").html(remainingCals)
    } else {
      $('#snack_table td.calorie_total').html(total)
      $('#snack_table td.calorie_remaining').addClass("negative").html(remainingCals)
    }
  }).then(function(){
    Meal.updateTotalTable()
  })

}


module.exports = Meal
