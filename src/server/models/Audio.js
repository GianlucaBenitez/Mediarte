import {Sequelize} from "sequelize";
import sequelize from '../config/db_sequelize.js';

// Definir la estructura del Audio
const Audio = sequelize.define('audio', {
    id_audio: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_audio: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate:{
            isAlpha: true
        }
    },
    tipo_meditacion: {
        type: Sequelize.STRING(25),
        allowNull: false,
        validate:{
            isAlpha: true
        }
    },
    cant_reprod: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            isInt: true,
        }
    },
    url_audio: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
  timestamps: false
})

Audio.sync();

export default Audio;