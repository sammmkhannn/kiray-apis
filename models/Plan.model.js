import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  planType: {
    type: String,
  },
  price: {
    type: Number,
  },
  freePosts: {
    type: Number,
  },
  availablePosts: {
    type: Number,
  },
  validity: {
    type: Number,
  },
  issueDate: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
  },
});

export default mongoose.model("Plan", planSchema);
