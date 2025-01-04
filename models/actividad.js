const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Actividad extends Model {
        static associate(models) {
        
        Actividad.belongsTo(models.Proyecto, { foreignKey: 'proyectoId' });
        }
    }

    Actividad.init(
        {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.DATE,
        },
        },
        {
        sequelize,
        modelName: 'Actividad',
        }
    );

    return Actividad;
};
