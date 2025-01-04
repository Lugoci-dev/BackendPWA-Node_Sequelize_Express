'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oferta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Oferta.belongsTo(models.Proyecto, {
        foreignKey: 'projectId',
        as: 'proyecto', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Oferta.init(
    {
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      new: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postedAt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contract: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      tools: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Oferta',
      tableName: 'Oferta',
      timestamps: true, 
    }
  );
  return Oferta;
};
