import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model('Token', tokenSchema);