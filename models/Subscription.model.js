import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    planId: {
        type: mongoose.Types.ObjectId,
        ref: "Plan"
    },
    planName: {
        type:String,  
    },
    issueDate: {
        type: Date,
        default:new Date()
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