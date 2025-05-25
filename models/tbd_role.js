'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Role.hasMany(models.UserRol, {
      //   foreignKey: 'rolId',
      //   as: 'userRoles',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });
    }
  }

  Role.init(
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
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'tbd_role',
      timestamps: true,
    }
  );

  return Role;
};
