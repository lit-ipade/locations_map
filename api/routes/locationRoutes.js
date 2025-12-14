import express from "express";
import Location from "../models/Location.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(201).json(location);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    const locations = await Location.find();
    res.json(locations);
});

export default router;
