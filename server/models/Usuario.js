import {Sequelize} from "sequelize";
import sequelize from '../config/db_sequelize.js';

// Definir la estructura del Usuario
const Usuario = sequelize.define('usuario', {
    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING(25),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    contrasena: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
  timestamps: false
})

Usuario.sync();

export default Usuario;