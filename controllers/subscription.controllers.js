import Subscription from "../models/Subscription.model.js";
import Plan from "../models/Plan.model.js";

export const subscribe = async (req, res) => {
  let userId = req.params.userId;
  let planId = req.params.planId;
  try {
    
    let subscription = new Subscription({
      userId,
      planId,
    })    
    await subscription.save();
    return res.status(200).send({success:true,Message:"subscribed!"});
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
};

export const subscriptionHistory = async (req, res) => {
  let userId = req.params.userId;
  try {
    let subscriptions = await Subscription.find({ userId });
    if (subscriptions.length <= 0) {
      return res
        .status(404)
        .send({ success: true, Message: "No subscritions found!" });
    }
    
    let modifiedSusbscritions = subscriptions.map(async(sub) => {
      let {_id:planId,planType,price,freePosts,validity} = await Plan.findOne({ _id: sub.planId });
       let expiry = new Date((new Date(sub.issueDate).setDate((new Date(sub.issueDate)).getDate() + 30)));
      let {_id:subscriptionId,availablePosts, issueDate, status } = sub;
      return { subscriptionId, planId, planType, price, freePosts, availablePosts, validity, issueDate, status, expiry };
    });
    return res
      .status(200)
      .send({ success: true, history: modifiedSusbscritions });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
};
