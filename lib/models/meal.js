var $ = require('jquery');
var host = require('../config').host

function Meal(data) {
  this.foodName = data.food_name,
  this.foodCalories = data.food_calories
  this.id = data.food_id
}

Meal.getMeal = function (meal) {
  return $.getJSON(`${host}/api/v1/${meal}`)
}

Meal.prototype.toHTML = function() {
  return `<tr class="meal-food" data-id="${this.id}">
            <td>${this.foodName}</td>
            <td>${this.foodCalories}</td>
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
Meal.allFoodsToHTML()


module.exports = Meal
