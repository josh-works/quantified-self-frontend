var $ = require('jquery');
var host = require('./config').host

function Food(food){
  this.id = food.id;
  this.name = food.name;
  this.calories = food.calories;
  this.createdAt = food.created_at
}

Food.deleteFood = function(foodId) {
  return $.ajax({
    method: 'DELETE',
    contentType: 'application/json; charset=utf-8',
    url: 'http://localhost:3000/api/v1/foods/' + foodId,
    dataType: 'json'
  })
}

Food.getAllFoods = function() {
  return $.getJSON(`${host}/api/v1/foods`)
}




module.exports = Food

