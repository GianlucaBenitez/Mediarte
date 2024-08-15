const { Sequelize } = require('sequelize');

// Connectar a DB
const database = new Sequelize(
  'mediarte', 
  'root', 
  '', 
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);

// Testeamos conexión
(async () => {
  try {
    await database.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = database