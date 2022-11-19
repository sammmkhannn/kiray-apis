import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    subscriptionId: {
        type: mongoose.Types.ObjectId,
        ref:'Subscription'
    },
    paymentTransactionId: {
        type: String,
    },
    username: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    receiptImage: {
        type: String,
    },
    approved: {
        type: Boolean,
        default:false,
    },
    canceled: {
        type: Boolean,
        default:false,
    }
}, { timestamps:true });


export default mongoose.model("Transaction", transactionSchema);