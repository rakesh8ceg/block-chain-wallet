const db = require("../models");
const Wallet = db.wallets;
const Currency = db.currencies;
const User = db.users;
const WalletCurrency = db.walletCurrency;
const Op = db.Sequelize.Op;

// Create and Save a new Wallet //Tested on postman // Documented on swagger
exports.create = (req,res) => {
    if (!req.body.address) {
        res.status(400).send({
          message: "address can not be empty!"
        });
        return;
      }
    return  Wallet.count({ where: { address: req.body.address } })
    .then((wallet) => {
        console.log(wallet);
            if(wallet !== 0){
                res.status(500).send({
                    message:
                    "Some error occurred while creating the Wallet. check count."
                });
                return;
            }
            return Wallet.create({
                address: req.body.address
            })
        })
      .then((wallet) => {
        console.log("Created Wallet: " + JSON.stringify(wallet, null, 2));
        let data = {};
        data.message = "Success";
        data.wallet = wallet;
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Wallet."
          });
      });
  };

// Retrieve all Wallets from the database. //Tested on Postman // Documented on swagger
exports.findAll = (req,res) => {
    let criteria = {};
    if(req.body.user_id){
        criteria.user_id = req.body.user_id
    }
    if(req.body.currency_id){
        criteria.currency_id = req.body.currency_id
    }
    if(req.body.wallet_id){
        criteria.wallet_id = req.body.wallet_id
    }
    return WalletCurrency.findAll({
        where : criteria,
        include: [{
            model: Wallet,
            as : 'wallets',
            attributes: ['address']
        },
        {
            model: User,
            as : 'users',
            attributes: ['email']
        },
        {
            model: Currency,
            as : 'currencies',
            attributes: ['code']
        }]
    })
      .then((wallets) => {
        let data = {};
        data.message = "Success";
        data.wallets = wallets;
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
            message:
              err.message || "Error while retrieving Wallets."
          });
      });
  };


// Add a currency to a wallet // Tested on Postman // Documented on swagger
exports.mapWallet = (req, res) => {
    if(req.body.address === undefined || req.body.user_id === undefined || req.body.code === undefined ){
        res.status(500).send({
            message:
               "Wallet || Currency || User not provided!"
          });
        return null;
    }

    return Wallet.findOne({where : { address : req.body.address}})
      .then((wallet) => {
        let promises = [];
        if (!wallet) {
          promises.push(
            Wallet.create({
              "address" : req.body.address
            })
          );
        }
        return Currency.findOne({where : {code : req.body.code}})
        .then((currency) => {
          if (!currency) {
            promises.push(
              Currency.create({
                "code" : req.body.code
              })
            );
          }

          return User.findOne({where : {id : req.body.user_id}})
          .then((user)=>{
            if (!user) {
                console.log("User not found!");
                res.status(500).send({
                    message:
                       "User not found!"
                  });
                return null;
              }
            
            return Promise.all(promises)
            .then((results)=>{
              console.log(results);
              if(results && results[1])  currency = results[1];
              if(results && results[0] && !wallet) wallet = results[0];
              if(results && results[0] && !currency) currency = results[0];
              return wallet.addCurrency(currency, { through: { user_id:  req.body.user_id}})
            })
            .then(()=>{
              let criteria = {};
              if(req.body.user_id){
                  criteria.user_id = req.body.user_id
              }
              if(currency.id){
                  criteria.currency_id = currency.id
              }
              if(wallet.id){
                  criteria.wallet_id = wallet.id
              }
              return WalletCurrency.findAll({
                where : criteria,
                include: [{
                    model: Wallet,
                    as : 'wallets',
                    attributes: ['address']
                },
                {
                    model: User,
                    as : 'users',
                    attributes: ['email']
                },
                {
                    model: Currency,
                    as : 'currencies',
                    attributes: ['code']
                }]
            });
            })
            .then((wallets)=>{
                console.log(`>> added currency id=${currency.id} to wallet id=${wallet.id} and user id=${req.body.user_id}`);
                let data = {};
                data.message = "Success";
                data.wallets = wallets
                res.send(data);
            })
          });
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Currency to Wallet: ", err);
        res.status(500).send({
            message:
              err.message || "Error while adding Currency to Wallet:"
          });
      });
  };
