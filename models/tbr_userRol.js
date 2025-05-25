'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRol extends Model {
    static associate(models) {
      // UserRol.belongsTo(models.User, {
      //   foreignKey: 'userId',
      //   as: 'user',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });
      // UserRol.belongsTo(models.Role, {
      //   foreignKey: 'rolId',
      //   as: 'role',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });
    }
  }

  UserRol.init(
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
      rolId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserRol',
      tableName: 'tbr_userRol',
      timestamps: true,
    }
  );

  return UserRol;
};
