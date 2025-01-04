const { Proyecto } = require('../models');

const proyectoController = {
    async getAll(req, res) {
        try {
        const proyectos = await Proyecto.findAll();
        res.status(200).json(proyectos);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener los proyectos', error });
        }
    },

    async getById(req, res) {
        try {
        const proyecto = await Proyecto.findByPk(req.params.id);
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(200).json(proyecto);
        } catch (error) {
        res.status(500).json({ message: 'Error al obtener el proyecto', error });
        }
    },

    async create(req, res) {
        try {
        const { nombre, descripcion, estado } = req.body;
        const nuevoProyecto = await Proyecto.create({ nombre, descripcion, estado });
        res.status(201).json(nuevoProyecto);
        } catch (error) {
        res.status(500).json({ message: 'Error al crear el proyecto', error });
        }
    },

    async update(req, res) {
        try {
        const proyecto = await Proyecto.findByPk(req.params.id);
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        const { nombre, descripcion, estado } = req.body;
        proyecto.nombre = nombre || proyecto.nombre;
        proyecto.descripcion = descripcion || proyecto.descripcion;
        proyecto.estado = estado || proyecto.estado;
        await proyecto.save();
        res.status(200).json(proyecto);
        } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el proyecto', error });
        }
    },

    async delete(req, res) {
        try {
        const proyecto = await Proyecto.findByPk(req.params.id);
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        await proyecto.destroy();
        res.status(204).send();
        } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el proyecto', error });
        }
    },
};

module.exports = proyectoController;
