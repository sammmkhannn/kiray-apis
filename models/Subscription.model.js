import mongoose from "mongoose";

let date = new Date();
const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref:'Product',
    },
    proudctName: {
        type:String,  
    },
    issueDate: {
        type: Date,
        default:date.toLocaleDateString()
    },
    expiryDate: {
        type: Date,
    },
    totalPosts: {
        type:Number,  
    },
    availablePosts: {
        type:Number,
    },
    active: {
        type:Boolean,
    }
}, {
    timestamps: true
});


export default mongoose.model("Subscription", subscriptionSchema);