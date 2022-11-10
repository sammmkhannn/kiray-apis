import Subscription from "../models/Subscription.model.js";

export const userSubscriptions = async (req, res) => {
  let userId = req.params.userId;
  try {
    let subscriptions = await Subscription.find({ userId });
    if (subscriptions.length <= 0) {
      return res
        .status(404)
        .send({ success: true, Message: "No subscritions found!" });
    }
    
    return res
      .status(200)
      .send({ success: true, history:subscriptions });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
};

export const subscriptionHisotry = async (req, res) => {
  try {
    let subscriptions = await Subscription.find({});
    return res.status(200).send({ success: true, subscriptions });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
}