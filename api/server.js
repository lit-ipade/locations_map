import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import locationRoutes from "./routes/locationRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/api/locations", locationRoutes);

// Conexão com MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { dbName: "locations" })
    .then(() => console.log("✅ MongoDB conectado com sucesso!"))
    .catch((err) => console.error("💥 Erro ao conectar no MongoDB:", err));

// Servidor online
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
