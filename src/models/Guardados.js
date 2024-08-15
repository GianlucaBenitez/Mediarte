const { Sequelize } = require('sequelize');
const sequelize = require('../config/db_sequelize');

// Definir la estructura del Guardado
const Guardado = sequelize.define('guardado', {
    id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'Usuario',
            key: 'id_usuario'
        },
        validate: {
            isInt: true
        }
    },
    tipo_meditacion: {
        type: Sequelize.STRING(25),
        allowNull: false,
        references: {
            model: 'Audio',
            key: 'tipo_meditacion'
        },
        validate:{
            isAlpha: true
        }
    }
}, {
  timestamps: false,
  indexes: [
    {
        name: "idx_validacion_guardados",
        unique: true,
        fields: ['id_usuario', 'tipo_meditacion']
    }
]
})

Guardado.sync();

module.exports = Guardado;