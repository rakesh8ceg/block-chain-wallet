module.exports = (sequelize, Sequelize) => {
    const Currency = sequelize.define("currencies", {
      code: {
        type: Sequelize.STRING
      }
    });

    return Currency;
  };