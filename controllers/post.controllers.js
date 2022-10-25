import Post from "../models/Post.model.js";
import multer from "multer";
import Subscription from "../models/Subscription.model.js";

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + file.originalname);
  },
});

export const upload = multer({ storage: diskStorage });

export const createPost = async (req, res) => {
  let userId = req.params.userId;
  let names = [];
  try {
    //check subscription plan
    // let subscription = await Subscription.findOne({ userId, status: "active" });
    // if (subscription && subscription.availablePosts === 0) {
    //   subscription.status = "inActive";
    //   await subscription.save();
    // }
    // if (subscription && subscription.status === "active") {
    //   //decrement number of posts by 1
    //   subscription.availablePosts -= 1;
    //save the plan
    // await subscription.save();
    let files = req.files.length > 5 ? req.files.slice(0, 5) : req.files;
    for (let file of files) {
      names.push(file.filename);
    }
    let newPost = new Post({
      userId,
      images: names,
      location: req.body.location,
      features: req.body.features,
      price: req.body.price,
      bedRooms: req.body.bedRooms,
      bathRooms: req.body.bathRooms,
      mainCategory: req.body.mainCategory,
      subCategory: req.body.subCategory,
      parkings: req.body.parkings,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      wifi: req.body.wifi,
      gym: req.body.gym,
      petHouse: req.body.petHouse,
      spa: req.body.spa,
      description: req.body.description,
      name: req.body.name,
    });
    await newPost.save();
    return res.status(200).send({
      success: true,
      Message: "Your post has been processed to the admin",
    });
    // }
  } catch (err) {
    return res.status(200).send({ success: false, message: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    let posts = await Post.find({});
    posts = posts.map((post) => {
      post.images = post.images.map((image) => {
        return `${process.env.BASE_URL}/images/${image}`;
      });
      return post;
    });
    return res.status(200).send({ success: true, posts });
  } catch (err) {
    return res.status(500).send({ success: fale, Message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  let userId = req.params.userId;
  try {
    let posts = await Post.find({ userId });
    return res.status(200).send({ success: true, posts });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
};

export const deletePost = async (req, res) => {
  let postId = req.body.postId;
  try {
    await Post.deleteOne({ _id: postId });
    return res
      .status(200)
      .send({ success: true, Message: "post has been deleted!" });
  } catch (err) {
    return res.status(500).send({ success: true, Message: err.message });
  }
};

export const editPost = async (req, res) => {
  let postId = req.params.postId;
  try {
    let payload = req.body;
    let images = [];
    if (req?.files?.length > 0) {
      for (let file of req?.files) {
        images.push(file?.filename);
      }

      payload.images = images;
    }

    await Post.updateOne({ _id: postId }, payload);
    return res
      .status(200)
      .send({ success: true, Message: "Post has been updated!" });
  } catch (err) {
    return res.status(500).send({ success: true, Message: err.message });
  }
};
