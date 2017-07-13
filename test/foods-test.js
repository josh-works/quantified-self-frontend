var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var test      = require('selenium-webdriver/testing');
var frontEndLocation = "http://localhost:8080"

test.describe('testing foods table', function() {
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  })

  test.afterEach(function() {
    driver.quit();
  })

  test.it("lists all foods on load", function() {
  driver.get(`${frontEndLocation}/foods.html`)
  driver.wait(until.elementLocated({css: ".delete"}))
  driver.findElements({css: ".delete"})
  .then(function (foods) {
    assert.lengthOf(foods, 18);
    })
  })

  // test.it("can add a food to the list with name and calories", function(){
  //   driver.get(`${frontEndLocation}/foods.html`)
  //   driver.wait(until.elementLocated({css: ".delete"}))
  //   driver.findElement({css: ".food-form input[name=food-name]"})
  //   .sendKeys("test food")
  //   driver.findElement({css: ".food-form input[name=food-calories]"})
  //   .sendKeys("669")
  //   driver.findElement({css: ".food-form input[type=submit]"})
  //   .click()
  //
  //   driver.wait(until.elementLocated({css: "#food_table .food-id-1"}))
  //   driver.findElements({css: ".delete"})
  //   .then(function(foods){
  //     assert.lengthOf(foods, 19)
  //   })
  //   driver.findElement({css: ".food_table"}).getText()
  //   .then(function(table){
  //     assert.include(table, "test food")
  //     assert.include(table, "669")
  //   })
  // })

  // test.it("provides error if only name given for new food", function(){
  //   driver.get(`${frontEndLocation}/foods.html`)
  //   driver.wait(until.elementLocated({css: ".delete"}))
  //   driver.findElement({css: ".food-form input[name=food-name]"})
  //   .sendKeys("chocolate")
  //   driver.findElement({css: ".food-form input[type=submit]"})
  //   .click()
  //   driver.wait(until.elementLocated({css: ".cal-error p"}))
  //   driver.findElement({css: ".cal-error p"}).getText()
  //   .then(function(error){
  //     assert.include(error, "Please enter a food calorie amount")
  //   })
  // })
  //
  // xtest.it("provides error if only calories given for new food", function(){
  //   driver.get(`${frontEndLocation}/foods.html`)
  //   driver.wait(until.elementLocated({css: ".delete"}))
  //   driver.findElement({css: ".food-form input[name=food-calories]"})
  //   .sendKeys("365")
  //   driver.findElement({css: ".food-form input[type=submit]"})
  //   .click()
  //   driver.wait(until.elementLocated({css: ".name-error p"}))
  //   driver.findElement({css: ".name-error p"}).getText()
  //   .then(function(error){
  //     assert.include(error, "Please enter a food name")
  //   })
  // })
  //
  //
  // xtest.it("can delete a food from table", function(){
  //   driver.get(`${frontEndLocation}/foods.html`)
  //   driver.findElement({css: ".food-id-1 .delete"})
  //   .click()
  //   driver.findElements({css: ".delete"})
  //   .then(function(foods){
  //     assert.lengthOf(foods, 18)
  //   })
  // })


})
