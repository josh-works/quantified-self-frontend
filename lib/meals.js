const Meal = require('./models/meal')
const $ = require('jquery')

$(function () {

  Meal.allFoodsToHTML()
  .then(data => {
    $('#breakfast_foods_table').append(data)
  })
})
