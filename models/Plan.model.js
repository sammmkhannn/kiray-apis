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
  validity: {
    type: Number,
  },
});

export default mongoose.model("Plan", planSchema);
