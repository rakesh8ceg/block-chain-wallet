module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      email: {
        type: Sequelize.STRING
      }
    });
    return User;
  };