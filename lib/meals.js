const Meal = require('./models/meal')
const $ = require('jquery')

$(function () {

  Meal.allFoodsToHTML('breakfast', 400)
  .then(data => {
    $('#breakfast_foods_table').append(data)
  })

  Meal.allFoodsToHTML('lunch', 600)
  .then(data => {
    $('#lunch_meals_table').append(data)
  })

  Meal.allFoodsToHTML('dinner', 800)
  .then(data => {
    $('#dinner_meals_table').append(data)
  })


  Meal.allFoodsToHTML('snack', 200)
  .then(data => {
    $('#snack_meals_table').append(data)
  })
})
