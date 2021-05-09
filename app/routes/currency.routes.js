module.exports = app => {
    const currencies = require("../controllers/currency.controller.js");
  
    var router = require("express").Router();

    // Create a new Currency // Tested on postman and Swagger
    router.post("/", currencies.create); 

    router.get("/findAll", currencies.findAll)
  
    app.use('/api/currencies', router);
  };