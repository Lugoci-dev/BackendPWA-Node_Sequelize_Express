'use strict';
const { Model } = require('sequelize');
// const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Las relaciones se agregarán después según sea necesario
    }
  }

  Product.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'tbd_product',
      timestamps: true,
    }
  );

  return Product;
};
