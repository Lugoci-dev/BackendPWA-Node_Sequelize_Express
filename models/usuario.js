// 'use strict';

// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Usuario extends Model {
//     static associate(models) {
//       // define association here
//     }
//   }
  
//   Usuario.init({
//     nombre: DataTypes.STRING,
//     email: DataTypes.STRING
//   }, 
//   {
//     sequelize,
//     modelName: 'Usuario',
//   });
//   return Usuario;
// };

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      this.belongsTo(models.Rol, { foreignKey: 'rolId' });
    }
  }

  Usuario.init({
    nombre: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    rolId: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'Rols',
        key: 'id',
      },
      allowNull: false,
      // defaultValue: 2, 
    },
  }, {
    sequelize,
    modelName: 'Usuario',
  });

  return Usuario;
};
