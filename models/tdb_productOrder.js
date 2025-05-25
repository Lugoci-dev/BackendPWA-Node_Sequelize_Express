'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductOrder extends Model {
    static associate(models) {
      // Las relaciones se agregarán después según sea necesario
    }
  }

  ProductOrder.init(
    {
      id: {
        type: DataTypes.UUID, // Cambiamos a UUID
        defaultValue: DataTypes.UUIDV4, // Genera un UUID v4 automáticamente
        primaryKey: true, // Especificamos que este es el campo primario
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProductOrder',
      tableName: 'tbr_productOrder',
      timestamps: true,
    }
  );

  return ProductOrder;
};
