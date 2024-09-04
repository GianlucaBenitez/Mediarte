import {Sequelize} from "sequelize";
import pg from "pg";
import {config} from "dotenv";
config();

// Connectar a DB
const database = new Sequelize({
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  dialectModule: pg,
  dialect: "postgres",
   dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }, 
});
// Testeamos conexión
(async () => {
  try {
    await database.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default database