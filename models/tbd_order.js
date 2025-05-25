'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Order.belongsTo(models.User, {
      //   foreignKey: 'userId',
      //   as: 'user',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.UUID, // Cambiamos a UUID
        defaultValue: DataTypes.UUIDV4, // Genera un UUID v4 automáticamente
        primaryKey: true, // Especificamos que este es el campo primario
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deliveryId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      purchaseCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      agree: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      shippingId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paymentMethodId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'tbd_order',
      timestamps: true,
    }
  );

  return Order;
};
