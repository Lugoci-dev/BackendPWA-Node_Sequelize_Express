const { Oferta } = require('../models');

exports.getAllOfertas = async (req, res) => {
    try {
        const ofertas = await Oferta.findAll({
            include: {
                association: 'usuario', // Incluir datos del usuario asociado
                attributes: ['nombre', 'email'], // Campos visibles del usuario
            },
        });
        res.json(ofertas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ofertas' });
    }
};

exports.createOferta = async (req, res) => {
    try {
        const nuevaOferta = await Oferta.create({
            ...req.body,
            usuarioId: req.user.id, // Asociar oferta con el usuario autenticado
        });
        res.status(201).json(nuevaOferta);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la oferta' });
    }
};

exports.getOfertaById = async (req, res) => {
    try {
        const oferta = await Oferta.findByPk(req.params.id, {
            include: {
                association: 'usuario', // Incluir datos del usuario asociado
                attributes: ['nombre', 'email'], // Campos visibles del usuario
            },
        });
        if (oferta) {
            res.json(oferta);
        } else {
            res.status(404).json({ error: 'Oferta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la oferta' });
    }
};

exports.updateOferta = async (req, res) => {
    try {
        const [updated] = await Oferta.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedOferta = await Oferta.findByPk(req.params.id, {
                include: {
                    association: 'usuario', // Incluir datos del usuario asociado
                    attributes: ['nombre', 'email'],
                },
            });
            res.json(updatedOferta);
        } else {
            res.status(404).json({ error: 'Oferta no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la oferta' });
    }
};

exports.deleteOferta = async (req, res) => {
    try {
        const deleted = await Oferta.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Oferta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la oferta' });
    }
};


// const { Oferta } = require('../models');

// exports.getAllOfertas = async (req, res) => {
//     try {
//         const ofertas = await Oferta.findAll();
//         res.json(ofertas);
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener las ofertas' });
//     }
// };

// exports.createOferta = async (req, res) => {
//     try {
//         const nuevaOferta = await Oferta.create(req.body);
//         res.status(201).json(nuevaOferta);
//     } catch (error) {
//         res.status(400).json({ error: 'Error al crear la oferta' });
//     }
// };

// exports.getOfertaById = async (req, res) => {
//     try {
//         const oferta = await Oferta.findByPk(req.params.id);
//         if (oferta) {
//             res.json(oferta);
//         } else {
//             res.status(404).json({ error: 'Oferta no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener la oferta' });
//     }
// };

// exports.updateOferta = async (req, res) => {
//     try {
//         const [updated] = await Oferta.update(req.body, {
//             where: { id: req.params.id }
//         });
//         if (updated) {
//             const updatedOferta = await Oferta.findByPk(req.params.id);
//             res.json(updatedOferta);
//         } else {
//             res.status(404).json({ error: 'Oferta no encontrada' });
//         }
//     } catch (error) {
//         res.status(400).json({ error: 'Error al actualizar la oferta' });
//     }
// };

// exports.deleteOferta = async (req, res) => {
//     try {
//         const deleted = await Oferta.destroy({
//             where: { id: req.params.id }
//         });
//         if (deleted) {
//             res.status(204).send();
//         } else {
//             res.status(404).json({ error: 'Oferta no encontrada' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error al eliminar la oferta' });
//     }
// };

// exports.getOfertasByProyecto = async (req, res) => {
//     try {
//         const ofertas = await Oferta.findAll({
//             where: { projectId: req.params.projectId }
//         });
//         if (ofertas.length > 0) {
//             res.json(ofertas);
//         } else {
//             res.status(404).json({ error: 'No se encontraron ofertas para este proyecto' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener las ofertas del proyecto' });
//     }
// };