import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  appId: { type: String, required: true },
  userId: { type: String },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Location", locationSchema);
