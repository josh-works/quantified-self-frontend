$(document).ready(function(data){
  $.ajax({
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            url: 'http://localhost:3000/api/v1/foods',
            dataType: 'json',
            success: function(data){
              displayTable(data)
            },
            error: function(result){
              error();
            }

          });

  function displayTable(foods){
    const foodsTable = $("#food_table tbody")
    foods.forEach(function(food){
      const tableRow = document.createElement("tr")
      $(tableRow).addClass(`food-id-${food.id}`)
      $(tableRow).append(`<td>${food.name}</td>`)
      $(tableRow).append(`<td>${food.calories}</td>`)
      foodsTable.append(tableRow)
    })
  }
})