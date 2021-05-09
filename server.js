const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');

const app = express();

const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });

// simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to BlockChain Wallet." });
});
// set port, listen for requests
require("./app/routes/wallet.routes")(app);
require("./app/routes/currency.routes")(app);
require("./app/routes/user.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});