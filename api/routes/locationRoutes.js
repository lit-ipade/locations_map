import express from "express";
import Location from "../models/Location.js";

const router = express.Router();

// POST - Receber e salvar localização
router.post("/", async (req, res) => {
    try {
        const { appId, userId, latitude, longitude } = req.body;

        if (!appId || !latitude || !longitude) {
            return res.status(400).json({ error: "Campos obrigatórios ausentes" });
        }

        const newLoc = new Location({
            appId,
            userId,
            latitude,
            longitude,
            timestamp: new Date(),
        });

        await newLoc.save();
        res.status(201).json({ message: "Localização salva com sucesso" });
    } catch (err) {
        console.error("Erro ao salvar localização:", err);
        res.status(500).json({ error: err.message });
    }
});

// GET - Buscar todas as localizações (ou filtrar por appId)
router.get("/", async (req, res) => {
    try {
        const { appId } = req.query;
        const filter = appId ? { appId } : {};
        const locations = await Location.find(filter).sort({ timestamp: -1 });
        res.json(locations);
    } catch (err) {
        console.error("Erro ao buscar localizações:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
