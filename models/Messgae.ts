import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  message: String,
  category: String,
  created_at: { type: mongoose.Schema.Types.Date, default: Date.now },
});

export default mongoose.model("Message", MessageSchema);
