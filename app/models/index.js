const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.wallets = require("./wallet.model.js")(sequelize, Sequelize);
db.currencies = require("./currency.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.walletCurrency = require("./wallet_currency.model.js")(sequelize, Sequelize);

db.wallets.belongsToMany(db.currencies, {
  through: db.walletCurrency,
  as: "currencies",
  foreignKey: "wallet_id",
});

db.currencies.belongsToMany(db.wallets, {
  through: db.walletCurrency,
  as: "wallets",
  foreignKey: "currency_id",
});

db.walletCurrency.belongsTo(db.wallets,{
  through: db.wallets,
  as : "wallets",
  foreignKey: "wallet_id"
})

db.walletCurrency.belongsTo(db.currencies,{
  through: db.currencies,
  as : "currencies",
  foreignKey: "currency_id"
})

db.walletCurrency.belongsTo(db.users, {
  through: db.users,
  as : "users",
  foreignKey : "user_id"
})


module.exports = db;