import Subscription from "../models/Subscription.model.js";
import Transaction from "../models/Transaction.model.js";



//create transaction
export const createTransaction = async (req, res) => {
    let userId = req.params.userId;
    try {
        if (!req.file) {
            return res.status(400).send({ success: false, Message: 'Kindly provide the transaction receipt as well' });
        }
        let transaction = new Transaction({
            userId,
            subscriptionId:req.body.subscriptionId,
            paymentTransactionId: req.body.transactionId,
            username: req.body.username,
            phoneNumber: req.body.phoneNumber,
            receiptImage: req.file.filename,
        });
        await transaction.save();
    } catch (err) {
        return res.status(500).send({ success: true, Message: err.message });
    }
}


export const getAllTranSactions = async (req, res) => {
    try {
        let transactions = await Transaction.find({});
        if (transactions.length <= 0) {
            return res.status(404).send({ success: false, Message: 'Transactions Not Found!' });
        }
        return res.status(200).send({ success: true, transactions });
    } catch (err) {
        return res.status(500).send({ success: false, Message: err.message });
    }
}

export const approveTransaction = async (req, res) => {
    let transactionId = req.params.transactionId;
    try {

        let transaction = await Transaction.findOneAndUpdate({ _id: transactionId }, req.body);
        //make the subscription active now
        let subscription = await Subscription.find({ _id: transaction.subscriptionId });
        subscription.active = true;
        await subscription.save();
        
        return res.status(200).send({ success: true, Message: "approval has been done!" });
    } catch (err) {
        return res.status(500).send({ success: false, Message: err.message });
    }
}

export const cancelTransaction = async (req, res) => {
    let transactionId = req.params.transactionId;
    try {
        await Transaction.updateOne({ _id: transactionId }, req.body);
        return res.status(200).send({ success: true, Message: 'Transaction has been updated!' });
    } catch (err) {
        return res.status(500).send({ success: false, Message: err.message });
    }
}