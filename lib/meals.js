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

  Meal.allFoodsToHTML('dinner')
  .then(data => {
    $('#dinner_meals_table').append(data)
  })


  Meal.allFoodsToHTML('snack')
  .then(data => {
    $('#snacks_meals_table').append(data)
  })
})
