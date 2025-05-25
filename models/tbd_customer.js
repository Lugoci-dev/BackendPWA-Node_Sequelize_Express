'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // Customer.belongsTo(models.User, {
      //   foreignKey: 'userId',
      //   as: 'user',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });
    }
  }

  Customer.init(
    {id: {
      type: DataTypes.UUID, // Cambiamos a UUID
      defaultValue: DataTypes.UUIDV4, // Genera un UUID v4 automáticamente
      primaryKey: true, // Especificamos que este es el campo primario
      allowNull: false,
    },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Customer',
      tableName: 'tbd_customer',
      timestamps: true,
    }
  );

  return Customer;
};
