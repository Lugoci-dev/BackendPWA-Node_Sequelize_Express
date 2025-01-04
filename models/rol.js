'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Rol extends Model {
        static associate(models) {
        this.hasMany(models.Usuario, { foreignKey: 'rolId' });
        }
    }

    Rol.init({
        nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    }, {
        sequelize,
        modelName: 'Rol',
    });

    return Rol;
};
