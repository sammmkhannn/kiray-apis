import mongoose from "mongoose";

let date = new Date();
const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    planId: {
        type: mongoose.Types.ObjectId,
        ref:'Product',
    },
    planName: {
        type:String,  
    },
    issueDate: {
        type: Date,
        default:date.toLocaleDateString(),
    },
    expiryDate: {
        type: Date,
        default:date.toLocaleDateString(),
    },
    totalPosts: {
        type: Number,
        default:0,
    },
    availablePosts: {
        type: Number,
        default:0,
    },
    status: {
        type: String,
        default:"pending"
    }
}, {
    timestamps: true
});


export default mongoose.model("Subscription", subscriptionSchema);