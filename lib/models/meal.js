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
            <td>${this.foodCalories}</td>
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
  console.log("array " +foodCaloriesArray);
  console.log("total" + totalCalories);
  var calorieCount = 0
  for (var i = 0; i < foodCaloriesArray.length; i++) {
    calorieCount += foodCaloriesArray[i]
  }
  return totalCalories - calorieCount
}

Meal.findCalories = function(meal){

 // Meal.getMeal(meal)
 //  .then(function getSum(data) {
 //    var remaining =  data.reduce(function (sum, foodItem) {
 //      console.log(sum, foodItem.food_calories);
 //      return sum + Number(foodItem.food_calories)
 //    }, 0)
 //  })
 //  getSum()
}

Meal.reloadAll = function() {
  Meal.allFoodsToHTML('breakfast', 400)
  .then(data => {
    $('#breakfast_meals_table').html("").append(data)
    var remaining = Meal.findCalories("breakfast")
    console.log("remaining " + remaining);
})

  Meal.allFoodsToHTML('lunch', 600)
  .then(data => {
    $('#lunch_meals_table').html("").append(data)
  })

  Meal.allFoodsToHTML('dinner', 800)
  .then(data => {
    $('#dinner_meals_table').html("").append(data)
  })


  Meal.allFoodsToHTML('snack', 200)
  .then(data => {
    $('#snack_meals_table').html("").append(data)
  })
}


module.exports = Meal
