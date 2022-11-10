import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
      type:String,  
    },
    planId: {
        type:String,
    },
    image: {
      type:String,
    },
    name: {
        type:String,
    },
    amount: {
        type: String,
    },
    active: {
        type:Boolean,
    },
    interval: {
        type: String,
    },
    freePosts: {
        type: Number
    },
    
});

export default mongoose.model("Proudct", productSchema);