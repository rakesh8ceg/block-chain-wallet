# block-chain-wallet
This project maps user with their blockchain wallet address


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

VS Code should installed on machine.
Node version v14.15.4
MySQL Server and workbench
Good knowledge of Node Environment
Understanding of express framework
Swagger for testing
Moderate knowlege of Sequelize library

### Installing and Running the project

A step by step series of examples that tell you how to get a development env running

1. Clone the master branch of the project in working directory by using
git clone https://github.com/rakesh8ceg/block-chain-wallet.git

2. Go to project directory
cd block-chain-wallet/

3. open project in visual studio code 
code .

4. Open CMD and run below command to run the project
npm start

5. Create "testdb" database in MySQL

Sequelize will initialize the all the table mapping and will get in sync with the database and models.

### Running the tests

1. Once the project is up and running open below URL for swagger testing 
http://localhost:8080/api-docs/
These will show the all the APIs related to wallet mapping with address.

## Built With

* [Swagger](https://swagger.io/) - Documentation and testing
* [Nodejs](https://nodejs.org/en/) - Javascript runtime to create server
* [Express](https://expressjs.com/) - Nodejs middleware framework which couples with HTTP request to robust API development
* [Sequelize](https://sequelize.org/) - Node ORM for MySQL database.
