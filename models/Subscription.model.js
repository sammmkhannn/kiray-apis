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
    issueDate: {
        type: Date,
        default:new Date()
    },
    expiryDate: {
        type: Date,
    },
    availablePost: {
        type:Number,
    },
    status: {
        type:String,
    }
}, {
    timestamps: true
});


export default mongoose.model("Subscription", subscriptionSchema);