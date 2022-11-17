import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    bankName: {
        type:String,
    },
    accountNumber: {
        type:String,
    },
    phoneNumber: {
        type:String,
    }
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);