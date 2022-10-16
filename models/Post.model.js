import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref:'Post'
  },
  name: {
    type: String,
  },
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
  wifi: {
    type: Boolean,
    default: false,
  },
  gym: {
    type: Boolean,
    default: false,
  },
  petHouse: {
    type: Boolean,
    default: false,
  },
  spa: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("Post", postSchema);
