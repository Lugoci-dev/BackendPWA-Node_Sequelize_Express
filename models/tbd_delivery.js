'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    static associate(models) {
      // Sin relaciones según indicación
    }
  }

  Delivery.init(
    {
      id: {
        type: DataTypes.UUID, // Cambiamos a UUID
        defaultValue: DataTypes.UUIDV4, // Genera un UUID v4 automáticamente
        primaryKey: true, // Especificamos que este es el campo primario
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Delivery',
      tableName: 'tbd_delivery',
      timestamps: true,
    }
  );

  return Delivery;
};
