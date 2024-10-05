import {Sequelize} from "sequelize";
import sequelize from '../config/db_sequelize.js';

// Definir la estructura del Usuario
const UsuarioTemporal = sequelize.define('usuarios_temporales', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    contrasena: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    otp: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    expiracion: {
        type: Sequelize.DATE,
        allowNull: false,
    },
},{
    timestamps: false,
})

UsuarioTemporal.sync();

export default UsuarioTemporal;