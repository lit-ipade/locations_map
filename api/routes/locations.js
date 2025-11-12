const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// POST - Receber localização
router.post('/', async (req, res) => {
    try {
        const { appId, userId, latitude, longitude } = req.body;
        if (!appId || !latitude || !longitude) {
            return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
        }

        const newLoc = new Location({ appId, userId, latitude, longitude });
        await newLoc.save();
        res.status(201).json({ message: 'Localização salva com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET - Todas as localizações
router.get('/', async (req, res) => {
    const { appId } = req.query;
    const filter = appId ? { appId } : {};
    const locations = await Location.find(filter).sort({ timestamp: -1 });
    res.json(locations);
});

module.exports = router;
