import mongoose from "mongoose";

let date = new Date();
const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
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
  phoneNumber: {
    type:String,
  },
  date: {
    type: Date,
    default: date.toLocaleDateString(),
  },
  time: {
    type: String,
    default:date.toLocaleTimeString(),
  }
});

export default mongoose.model("Request", requestSchema);
