const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Proyecto extends Model {
        static associate(models) {
        
        Proyecto.hasMany(models.Actividad, { foreignKey: 'proyectoId' });
        }
    }

    Proyecto.init(
        {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'activo',
        },
        },
        {
        sequelize,
        modelName: 'Proyecto',
        }
    );

    return Proyecto;
};
