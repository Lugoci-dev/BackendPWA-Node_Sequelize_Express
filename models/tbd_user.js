'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.hasOne(models.Customer, {
      //   foreignKey: 'userId',
      //   as: 'customer',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });
      // User.hasMany(models.UserRol, {
      //   foreignKey: 'userId',
      //   as: 'roles',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });
      // User.hasMany(models.Order, {
      //   foreignKey: 'userId',
      //   as: 'orders',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID, // Cambiamos a UUID
        defaultValue: DataTypes.UUIDV4, // Genera un UUID v4 automáticamente
        primaryKey: true, // Especificamos que este es el campo primario
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'tbd_user',
      timestamps: true,
    }
  );

  return User;
};
