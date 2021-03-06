var $ = require('jquery');
var host = require('./config').host

function Food(food){
  this.id = food.id;
  this.name = food.name;
  this.calories = food.calories;
  this.createdAt = food.created_at
}

Food.prototype.createFood = function(){
  return $.post(host + 'foods/', {name: this.name, calories: this.calories })
  .then(function(foodObject){
    return new Food(foodObject)
  })
}

Food.deleteFood = function(foodId) {
  return $.ajax({
    method: 'DELETE',
    contentType: 'application/json; charset=utf-8',
    url: host + 'foods/' + foodId,
    dataType: 'json'
  })
}

Food.updateName = function(id, newName){
  var data = { name: newName}
  return $.ajax({
    method: 'PUT',
    url: host + 'foods/' + id,
    data: data,
  })
}

Food.updateCalories = function(id, newCalories){
  var data = { calories: newCalories}
  return $.ajax({
    method: 'PUT',
    url: host + 'foods/' + id,
    data: data,
  })
}

Food.getAllFoods = function() {
  return $.getJSON(`${host}foods`)
}



module.exports = Food
