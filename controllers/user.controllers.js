import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import Token from "../models/Token.model.js";
import SubscriptionModel from "../models/Subscription.model.js";
export const register = async (req, res) => {
  try {
    let profile = req.file.filename;
    let user = new User({
      fullName: req.body.fullName,
      profile,
      cell: req.body.cell,
    });
    await user.save();
    return res
      .status(200)
      .send({ success: true, Message: "User has been registered" });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    let user = await User.findOne({ cell: req.body.cell });
    let subscription = await SubscriptionModel.findOne({ status: 'active', userId: user._id });
    if (subscription) {
      if (new Date().getTime() >= new Date(subscription.expiryDate).getTime()) {
        subscription.status('inactive');
        await subscription.save();
      }
    }
    if (!user) {
      return res
        .status(404)
        .send({ success: true, Message: "User Not Found!" });
    } else {
      let accessToken = jwt.sign(
        { userId: user._id, cell: user.cell },
        process.env.ACCESS_TOKEN_SECRET
      );
      let newToken = new Token({
        token: accessToken,
        userId: user._id,
      });
      await newToken.save();
      return res.status(200).send({
        success: true,
        Message: "Signed In",
        token: accessToken,
        user: {
          _id: user._id,
          fullName: user.fullName,
          profile: `${process.env.BASE_URL}/images/${user.profile}`,
          cell: user.cell,
        },
      });
    }
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
};

export const logout = async (req, res) => {
  let userId = req.params.userId;
  try {
    await Token.deleteOne({ userId });
    return res.status(200).send({ success: true, Message: "Logged out!" });
  } catch (err) {
    return res.status(500).send({ success: true, Message: err.message });
  }
};

export const blockUnblockUser = async (req, res) => {
  let userId = req.params.userId;
  try {
    let user = await User.findOne({ _id: userId });
    user.blocked = !user.blocked;
    await user.save();
    return res
      .status(200)
      .send({
        success: true,
        Message: user.blocked
          ? "You blocked this user!"
          : "You unblocked this user!",
      });
  } catch (err) {
    return res.status(200).send({ success: false, Message: err.message });
  }
};
