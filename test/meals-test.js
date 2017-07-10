var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var until = webdriver.until;
var test      = require('selenium-webdriver/testing');
var frontEndLocation = "http://localhost:8080"

test.describe('meals tables', function() {
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

  test.it("shows all meals", function() {
  driver.get(`${frontEndLocation}/`)
  driver.wait(until.elementLocated({css: "script[src='main.bundle.js']"}))
  driver.findElements({css: ".meals_table"})
  .then(mealsTables => {
    assert.lengthOf(mealsTables, 4);
    })
  })




})
