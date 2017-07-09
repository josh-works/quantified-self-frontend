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
    assert.lengthOf(foods, 3);
    })
  })

  test.it("can add a food to the list with name and calories", function(){
    driver.get(`${frontEndLocation}/foods.html`)
    driver.wait(until.elementLocated({css: ".delete"}))
    driver.findElement({css: ".food-form input[name=food-name]"})
    .sendKeys("chocolate")
    driver.findElement({css: ".food-form input[name=food-calories]"})
    .sendKeys("305")
    driver.findElement({css: "input[type=submit]"})
    .click()

    driver.wait(until.elementLocated({css: ".food-id-4"}))
    driver.findElements({css: ".delete"})
    .then(function(foods){
      assert.lengthOf(foods, 4)
    })
    driver.findElement({css: ".food-id-4"}).getText()
    .then(function(row){
      assert.include(row, "chocolate")
      assert.include(row, "305")
    })
  })


  test.it("can delete a food from table", function(){
    driver.get(`${frontEndLocation}/foods.html`)
    driver.findElement({css: ".food-id-1 .delete"})
    .click()
    driver.findElements({css: ".delete"})
    .then(function(foods){
      assert.lengthOf(foods, 3)
    })
  })

  test.it("can update a food name", function(){
    driver.get(`${frontEndLocation}/foods.html`)
    driver.findElement({css: ".food-id-2 #fname"})
    .sendKeys("banana-two")
    driver.findElement({css: ".food-id-2"}).getText()
    .then(function(row){
      assert.include(row, "banana-two")
    })

  })
})
