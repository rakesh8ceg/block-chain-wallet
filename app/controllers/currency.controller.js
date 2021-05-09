const db = require("../models");
const Currency = db.currencies;

// Create and Save a new currency // Tested on swagger and postman
exports.create = (req,res) => {
    if (!req.body.code) {
        res.status(400).send({
          message: "code can not be empty!"
        });
        return;
      }
      return  Currency.count({ where: { code: req.body.code } })
      .then((currency) => {
              if(currency !== 0){
                  res.status(500).send({
                      message:
                      "Some error occurred while creating the currency. check count."
                  });
                  return;
              }
              return Currency.create({
                  code: req.body.code
              })
          })
      .then((currency) => {
        console.log("Created Currency: " + JSON.stringify(currency, null, 2));
        let data = {};
        data.message = "Success",
        data.currency = currency;
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Currency."
          });
      });
  };

// Retrieve all currencies from the database. // Tested on swagger and postman
exports.findAll = (req,res) => {
    return Currency.findAll({})
      .then((currencies) => {
        let data = {};
        data.message = "Success",
        data.currencies =  currencies;
        res.send(data);
      })
      .catch((err) => {
        console.log(">> Error while retrieving currencies: ", err);
        res.status(500).send({
          message:
           err.message || "Error while retrieving currencies"
      });
      });
  };


