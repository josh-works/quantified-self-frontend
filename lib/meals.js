const Meal = require('./models/meal')
const $ = require('jquery')

$(function () {

  Meal.allFoodsToHTML('breakfast')
  .then(data => {
    $('#breakfast_foods_table').append(data)
  })

  Meal.allFoodsToHTML('lunch')
  .then(data => {
    $('#lunch_meals_table').append(data)
  })
})
