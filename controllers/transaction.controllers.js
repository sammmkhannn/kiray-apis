import Subscription from "../models/Subscription.model.js";
import Transaction from "../models/Transaction.model.js";
import Plan from "../models/Plan.model.js";
import UserModel from "../models/User.model.js";


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
        return res.status(200).send({ success: true, Message: "Transaction has been processed to the admin" });
    } catch (err) {
        return res.status(500).send({ success: true, Message: err.message });
    }
}


export const getAllTransactions = async (req, res) => {
    try {
        let transactions = await Transaction.find({});
        if (transactions.length <= 0) {
            return res.status(404).send({ success: false, Message: 'Transactions Not Found!' });
        }
        transactions = transactions.map((transaction) => {
            transaction.receiptImage = process.env.BASE_URL + transaction.receiptImage;
            return transaction;
        });
        return res.status(200).send({ success: true, transactions });
    } catch (err) {
        return res.status(500).send({ success: false, Message: err.message });
    }
}

export const transactionsForApproval = async (req, res) => {
    try {
        let transactions = await Transaction.find({ approved: false, canceled: false });
        let modifiedTransactions = [];
        // return res.status(200).send({ transactions });
        for (let transaction of transactions) {
            //get user
            let user = await UserModel.findOne({ _id: transaction.userId });
            //get subscription 
            let subscription = await Subscription.findOne({ _id: transaction.subscriptionId });
            //get plan
            let plan = await Plan.findOne({ _id: subscription.planId });
            modifiedTransactions.push({ profile: process.env.BASE_URL + user.profile, username: user.fullName, phoneNumber: user.cell, planName: plan.name, price: plan.amount, transactionId: transaction.paymentTransactionId, paymentReciept: transaction.receiptImage });
        }
        return res.status(200).send({ success: false, transactions: modifiedTransactions });
    } catch (err) {
        return res.status(500).send({ success: false, Message: err.message });
    }
}

export const approveTransaction = async (req, res) => {
    let transactionId = req.params.transactionId;
    try {

        let transaction = await Transaction.findOneAndUpdate({ _id: transactionId }, {approved:true});
        //make the subscription active now
        let subscription = await Subscription.findOne({ _id: transaction.subscriptionId });
        let plan = await Plan.findOne({ _id: subscription.planId });
        //set free posts
        subscription.planName = plan.name;
        subscription.freePosts = plan.freePosts;
        //set expiry
        subscription.expiryDate = new Date(new Date(subscription.issueDate).setDate(new Date(subscription.issueDate).getDate() + 30)).toLocaleDateString();
        //set available posts
        subscription.availablePosts = plan.freePosts;
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
        await Transaction.updateOne({ _id: transactionId }, {canceled:true});
        return res.status(200).send({ success: true, Message: 'Transaction has been updated!' });
    } catch (err) {
        return res.status(500).send({ success: false, Message: err.message });
    }
}

export const adminIncome = async (req, res) => {
    try {
        let transactions = await Transaction.find({ approved: true });

        // return res.status(200).send({ transactions });
        //get subscriptions ids
        // let subscriptions = transactions.map(async(transaction) => {
        //     let subscription = await Subscription.findOne({ _id: transaction.subscriptionId });
        //     return subscription;
        // });
        //get subscriptions
        let subscriptions = [];
        for (let transaction of transactions) {
            let subscription = await Subscription.findOne({ _id: transaction.subscriptionId });
            subscriptions.push(subscription);
        }

        //get PlanIds
        let planIds = subscriptions.map((subscription) => {
            return subscription.planId;
        });
        
        // get plans
        let plans = [];
        for (let planId of planIds) {
            let plan = await Plan.find({ _id: planId });
            plans.push(plan);
        }
        plans = plans.flat(1);
        // return res.status(200).send({ success: true, transactions, plans ,subscriptions});
        //calculate income
        //get the amounts
        let amounts = plans.map((plan) => parseInt(plan.amount));

        let income = amounts.reduce((amount, sum) => {
            return amount + sum;
        });
        let allData = transactions.map((transaction, index) => {
            return { transaction, subscription:subscriptions[index], plan:plans[index] };
        });
        return res.status(200).send({ success: true, allData, income });
    } catch (err) {
        
    }
}