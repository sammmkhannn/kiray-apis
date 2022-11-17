import Subscription from "../models/Subscription.model.js";

export const createSubscription = async (req, res) => {
  let userId = req.params.userId;
  try {
    let subscription = new Subscription({
      userId,
      planId: req.body.planId,
      proudctName: req.body.proudctName,
      issueDate: req.body.issueDate,
      expiryDate: req.body.expiryDate,
      totalPosts: req.body.totalPosts,
      availablePosts: req.body.availablePosts,
      active:false,
    });
    let sub = await subscription.save();
    return res.status(200).send({ success: false, Message: "Subscribed the plan",subscription:sub });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
}

export const updateSubscription = async (req, res) => {
  let subscriptionId = req.params.subscriptionId;
  try {
    await Subscription.updateOne({ _id: subscriptionId }, req.body);
    return res.status(200).send({ success: true, Message: "Subscription has been updated!" });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
}

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



