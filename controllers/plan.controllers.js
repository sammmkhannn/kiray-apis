import Plan from "../models/Plan.model.js";
import Admin from "../models/Admin.model.js";

//create product
export const createPlan = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).send({ success: false, Message: "Image is required" });
        }
        let plan = new Plan({
            image: req.file.filename,
            name: req.body.name,
            amount: req.body.amount,
            interval: req.body.interval,
            freePosts: req.body.freePosts,
        });
        plan.save().then((response) => {
            return res.status(200).send({ success: true, Message: "plan has been created!" });
        }).catch((err) => {
            return res.status(500).send({ success: false, Message: err.message });
        });

    } catch (err) {
        return res.status(500).send({ success: false, Message: err.message });

    }
};

//get all plans
export const getAllPlans = async (req, res) => {
    try {
        let plans = await Plan.find({});
        plans = plans.map((plan) => {
            plan.image = `${process.env.BASE_URL}/images/${plan.image}`;
            return plan;
        });
        let admin = await Admin.findOne();
        
        if (plans.length > 0) {
            return res.status(200).send({ success: true, plans,bankDetails:{bankName:admin.bankName,accountNumber:admin.accountNumber,phoneNumber:admin.phoneNumber} });
        }
        return res.status(404).send({ success: false, Message: "Plans Not Found!" });
    } catch (err) {
        return res.status(500).send({ success: false, Message: err.message });
    }
};

//update plan
export const updatePlan = async (req, res) => {
    let planId = req.params.planId;
    try {
        
        let query = {};
        req.file ? query.image = req.file.filename : "";
        req.body.name ? query.name = req.body.name : "";
        req.body.amount ? query.amount = req.body.amount : "";
        req.body.interval ? query.interval = req.body.interval : "";
        req.body.freePosts ? query.freePosts = req.body.freePosts : "";
        //plans
        await Plan.updateOne({ _id: planId },query);
        return res.status(200).send({ success: false, Message: 'plan has been updated!' });
    } catch (err) {
        return res.status(500).send({ success: false, Message: err.message });
    }
};


