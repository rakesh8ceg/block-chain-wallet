module.exports = (sequelize, Sequelize) => {
    const Wallet = sequelize.define("wallets", {
      address: {
        type: Sequelize.STRING
      }
    });
    return Wallet;
  };