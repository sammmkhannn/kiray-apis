import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    image: {
      type:String,
    },
    name: {
        type:String,
    },
    amount: {
        type: String,
    },
    interval: {
        type: String,
    },
    freePosts: {
        type: Number
    },
    
},{timestamps:true});

export default mongoose.model("Plan", planSchema);