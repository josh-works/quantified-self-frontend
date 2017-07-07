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
      $(tableRow).append(`<input type="image" src="./public/delete_button.png" />`)
      foodsTable.append(tableRow)
    })
    $('tr input[type="image"]').on('click', function(){
      var food_id = $(this).parents()[0].className.slice(-1)
      // console.log(food_id);
      deleteFood(food_id)
    })
  }

  function deleteFood(food_id){
    $.ajax({
      method: 'DELETE',
      contentType: 'application/json; charset=utf-8',
      url: 'http://localhost:3000/api/v1/foods/' + food_id,
      dataType: 'json',
      success: function(data){
        updateTable(data)
      },
      error: function(result){
        error();
      }
    })
  }

  function updateTable(data){
    // displayTable()
  }

})



