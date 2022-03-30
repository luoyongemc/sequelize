const {Sequelize, Op, Model, DataTypes} = require('sequelize');

const sequelize = new Sequelize('codehub','root','12345678',{
    host:'localhost',
    dialect:'mysql'
})

const testConnect = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// testConnect();

module.exports = sequelize;