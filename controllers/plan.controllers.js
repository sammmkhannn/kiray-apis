import Plan from "../models/Plan.model.js";

export const subscribe = async (req, res) => {
  let userId = req.params.userId;
  try {
    //check the plan type and charge the account
    let plan = new Plan({
      userId,
      planType: req.body.fullName,
      price: req.body.price,
      freePosts: req.body.freePosts,
      availablePosts: req.body.freePosts,
      validity: req.body.validity,
      issueDate: req.body.issueDate,
      status: "active",
    });
    await plan.save();
    return res.status(200).send;
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
};

export const subscriptionHistory = async (req, res) => {
  let userId = req.params.userId;
  try {
    let subscriptions = await Plan.find({ userId });
    if (subscriptions.length <= 0) {
      return res
        .status(404)
        .send({ success: true, Message: "No subscritions found!" });
    }
    let modifiedSusbscritions = subscriptions.map((sub) => {
      let payload = sub;
      payload.expiry = sub.issueDate.setDate(
        new Date(sub.issueDate).getDate() + 30
      );
      return payload;
    });
    return res
      .status(200)
      .send({ success: true, history: modifiedSusbscritions });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
};
