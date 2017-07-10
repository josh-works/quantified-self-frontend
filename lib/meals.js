const Meal = require('./models/meal')
const $ = require('jquery')


$(function () {
  Meal.reloadAll()
})
