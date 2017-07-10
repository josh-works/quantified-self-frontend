var $ = require('jquery');
var host = require('./config').host

function Meal(data) {}

Meal.getBreakfast = function () {
  return $.getJSON(`${host}api/v1/breakfast`)
}

Meal.toHTML = function () {
  return Meal.getBreakfast()
  .then(data => {
    console.log(data);
  })
}
console.log(Meal.getBreakfast());
Meal.toHTML()
