const db = require("../models");
const Wallet = db.wallets;
const Currency = db.currencies;
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User //  Test on swagger
exports.create = (req,res) => {
    if (!req.body.email) {
        res.status(400).send({
          message: "email can not be empty!"
        });
        return;
      }
    return  User.count({ where: { email: req.body.email } })
    .then((user) => {
        console.log(user);
            if(user !== 0){
                res.status(500).send({
                    message:
                    "Some error occurred while creating the user. check count."
                });
                return;
            }
            return User.create({
                email: req.body.email
            })
        })
      .then((user) => {
        console.log("Created user: " + JSON.stringify(user, null, 2));
        let data = {};
        data.message = "Success",
        data.user = user;;
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the user."
          });
      });
  };




