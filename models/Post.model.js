import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  images: {
    type: Array,
  },
  location: {
    type: String,
  },
  features: {
    type: Array,
  },
  price: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
  },
  bathRooms: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  parkings: {
    type: Number,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

export default mongoose.model("Post", postSchema);
