module.exports = (sequelize, Sequelize) => {
    const WalletCurrency = sequelize.define("wallet_currencies", {
      user_id: {
        type: Sequelize.INTEGER
      }
    });
    return WalletCurrency;
  };