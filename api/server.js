import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import locationRoutes from "./routes/locationRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ROTAS
app.use("/api/locations", locationRoutes);

app.get("/", (req, res) => {
  res.send("API de Localizações rodando 🚀");
});

app.post("/", (req, res) => {
  console.log("📍 Nova localização:", req.body);
});

// Conexão Mongo
mongoose.connect(process.env.MONGODB_URI, {
  dbName: "locations"
})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
