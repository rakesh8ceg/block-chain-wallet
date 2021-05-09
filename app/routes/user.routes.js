module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();

    // Create a new Currency
    router.post("/", users.create); // tested for creation
  
    app.use('/api/users', router);
  };