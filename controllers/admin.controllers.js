import Admin from "../models/Admin.model.js";
import Post from "../models/Post.model.js";
import User from "../models/User.model.js";
import Request from "../models/Request.model.js";
import Token from "../models/Token.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Plan from "../models/Plan.model.js";

// export const register = async (req, res) => {
//   try {
//     let salt = bcryptjs.genSaltSync(10);
//     let admin = await Admin.findOne();
//     if (!admin) {
//       let admin = new Admin({
//         username: req.body.username,
//         password: bcryptjs.hashSync(req.body.password, salt),
//       });
//       await admin.save();

//       return res
//         .status(200)
//         .send({ success: true, Message: "registered successfully!" });
//     }
//     return res
//       .status(400)
//       .send({ success: false, Message: "Can't be registered!" });
//   } catch (err) {
//     return res.status(500).send({ success: false, Message: err.message });
//   }
// };

export const login = async (req, res) => {
  try {
    let admin = await Admin.findOne({ username: req.body.username });
    if (!admin) {
      return res
        .status(404)
        .send({ success: true, Message: "user does not exists!" });
    }
    bcryptjs.compare(req.body.password, admin.password, (err, res) => {
      if (err) {
        return res
          .status(400)
          .send({ success: false, Message: "invalid username or password!" });
      }
    });
    let authToken = jwt.sign(
      { id: admin._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    let token = new Token({
      token: authToken,
      userId: admin._id,
    });
    await token.save();
    return res.status(200).send({ success: true, Message: "Logged In", token ,admin});
  } catch (err) {
    return res.status(500).send({ success: true, Message: err.message });
  }
};

export const getRegisteredUsers = async (req, res) => {
  try {
    let users = await User.find();
    users = users.map((user) => {
      user.profile = `${process.env.BASE_URL}/images/${user.profile}`;
      return user;
    });
    if (users.length === 0) {
      return res
        .status(404)
        .send({ success: true, Message: "Users Not Found!" });
    }
    return res.status(200).send({ success: true, users });
  } catch (err) {
    return res.status(500).send({ success: true, Message: err.message });
  }
};

export const getTotalUsersCount = async (req, res) => {
  try {
    let usersCount = await User.find({}).count();
    return res.status(200).send({ success: true, totalUsers: usersCount });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
};

export const postsApproval = async (req, res) => {
  try {
    let posts = await Post.find({ approved: false });
  
    let modifiedPosts = [];
    for (let post of posts) {
      let { location, features,price,bedrooms,mainCategory,parkings,longitude,latitude,wifi,gym,petHouse,spak,description,name,subCategory,bathRooms } = post;
      let user = await User.findOne({ _id: post.userId });
      let username = user.fullName;
      let userpic = `${process.env.BASE_URL}/images/${user.profile}`
      let userPhone = user.cell;
      let images = post.images.map((image) => {
        return `${process.env.BASE_URL}/images/${image}`;
      });

      modifiedPosts.push({username,userpic,images,userPhone,location, features,price,bedrooms,mainCategory,parkings,longitude,latitude,wifi,gym,petHouse,spak,description,name,subCategory,bathRooms });
    }
  
    return res.status(200).send({ success: true, modifiedPosts });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
};

export const approve = async (req, res) => {
  let postId = req.params.postId;
  try {
    await Post.findOneAndUpdate({ _id: postId }, { approved: true });
    return res.status(200).send({ success: true, Message: "Approved!" });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
};

export const cancelApprovalRequest = async (req, res) => {
  let postId = req.body.postId;
  try {
    await Post.findOneAndUpdate({ _id: postId }, { canceled: true });
    return res.status(200).send({ success: true, Message: "canceled!" });
  } catch (err) {
    return res.status(500).send({ success: true, Message: err.message });
  }
};

export const customerSupportRequests = async (req, res) => {
  try {
    let requests = await Request.find({});
    return res.status(200).send({ success: true, requests });
  } catch (err) {
    return res.status(500).send({ success: true, Message: err.message });
  }
};

export const logout = async (req, res) => {
  let adminId = req.body.adminId;
  try {
    await Token.deleteOne({ userId: adminId });
    return res.status(200).send({ success: true, Message: "Logged out" });
  } catch (err) {
    return res.status(200).send({ success: true, Message: err.message });
  }
};

export const modifyPlan = async (req, res) => {
  const planId = req.params.planId;
  try {
    //modify existing plan
  } catch (err) {}
};

export const getAllSubscriptions = async (req, res) => {
  try {
  } catch (err) {
    //get all subscriptions
  }
};
