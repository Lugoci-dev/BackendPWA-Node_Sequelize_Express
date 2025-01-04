const { Actividad, Proyecto } = require('../models');

const actividadController = {
    async getAll(req, res) {
        try {
        const actividades = await Actividad.findAll({ include: Proyecto });
        res.status(200).json(actividades);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener las actividades', error });
        }
    },

    async getById(req, res) {
        try {
        const actividad = await Actividad.findByPk(req.params.id, { include: Proyecto });
        if (!actividad) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }
        res.status(200).json(actividad);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener la actividad', error });
        }
    },

    async create(req, res) {
        try {
        const { titulo, descripcion, fecha_inicio, fecha_fin, proyectoId } = req.body;
        const nuevaActividad = await Actividad.create({
            titulo,
            descripcion,
            fecha_inicio,
            fecha_fin,
            proyectoId,
        });
        res.status(201).json(nuevaActividad);
        } catch (error) {
        res.status(500).json({ message: 'Error al crear la actividad', error });
        }
    },

    async update(req, res) {
        try {
        const actividad = await Actividad.findByPk(req.params.id);
        if (!actividad) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }
        const { titulo, descripcion, fecha_inicio, fecha_fin, proyectoId } = req.body;
        actividad.titulo = titulo || actividad.titulo;
        actividad.descripcion = descripcion || actividad.descripcion;
        actividad.fecha_inicio = fecha_inicio || actividad.fecha_inicio;
        actividad.fecha_fin = fecha_fin || actividad.fecha_fin;
        actividad.proyectoId = proyectoId || actividad.proyectoId;
        await actividad.save();
        res.status(200).json(actividad);
        } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la actividad', error });
        }
    },

    async delete(req, res) {
        try {
        const actividad = await Actividad.findByPk(req.params.id);
        if (!actividad) {
            return res.status(404).json({ message: 'Actividad no encontrada' });
        }
        await actividad.destroy();
        res.status(204).send();
        } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la actividad', error });
        }
    },
};

module.exports = actividadController;
