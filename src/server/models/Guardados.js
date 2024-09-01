const { Sequelize } = require('sequelize');
const sequelize = require('../config/db_sequelize');
const Usuario = require('../models/Usuario.js');
const Audio = require('../models/Audio.js')

// Definir la estructura del Guardado
const Guardado = sequelize.define('guardado', {
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

module.exports = Guardado;