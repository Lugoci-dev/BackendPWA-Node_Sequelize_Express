'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    static associate(models) {
      // Sin relaciones según indicación
    }
  }

  PaymentMethod.init(
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
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PaymentMethod',
      tableName: 'tbd_paymentMethod',
      timestamps: true,
    }
  );

  return PaymentMethod;
};
