import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  subject: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Request", requestSchema);
