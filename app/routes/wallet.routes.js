module.exports = app => {
    const wallets = require("../controllers/wallet.controller.js");
  
    var router = require("express").Router();

    // Create a new Wallet
    router.post("/", wallets.create); 
  
    // Retrieve all wallets with criteria
    router.post("/findAll", wallets.findAll);

    //map  wallet to user and currency
    router.post('/mapWallet', wallets.mapWallet)
    
    app.use('/api/wallets', router);
  };