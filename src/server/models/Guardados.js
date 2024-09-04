import {Sequelize} from "sequelize";
import sequelize from '../config/db_sequelize.js';
import Usuario from '../models/Usuario.js';
import Audio from '../models/Audio.js';

// Definir la estructura del Guardado
const Guardado = sequelize.define('guardado', {
    id_guardado:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: Sequelize.INTEGER,
    },
    id_audio: {
        type: Sequelize.INTEGER,
    },
},{
  timestamps: false,
})

Usuario.belongsToMany(Audio, {
    through: Guardado,
    foreignKey: "id_usuario",
});

Audio.belongsToMany(Usuario, {
    through: Guardado,
    foreignKey: "id_audio",
});

Guardado.belongsTo(Usuario, {
    targetKey: "id_usuario",
    foreignKey: "id_usuario",
});

Guardado.belongsTo(Audio, {
    targetKey: "id_audio",
    foreignKey: "id_audio",
});

Guardado.sync();

export default Guardado;