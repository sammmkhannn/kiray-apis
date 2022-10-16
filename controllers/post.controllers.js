import Post from "../models/Post.model.js";
import multer from "multer";
import Plan from "../models/Plan.model.js";

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
    let plan = await Plan.findOne({ userId, status: "active" });
    if (plan && plan.availablePosts === 0) {
      plan.status = "inActive";
      await plan.save();
    }
    if (plan && plan.status === "active") {
      //decrement number of posts by 1
      plan.availablePosts -= 1;
      //save the plan
      await plan.save();
      let files = req.files;
      for (let file of files.slice(0, 5)) {
        names.push(file.filename);
      }
      let newPost = new Post({
        userId,
        images: names,
        location: req.body.location,
        features: req.body.features,
        price: req.body.price,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        category: req.body.category,
        parkings: req.body.parkings,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        wifi: req.body.wifi,
        gym: req.body.gym,
        petHouse: req.body.petHouse,
        spa: req.body.spa,
        description: req.body.description,
        name:req.body.name
      });
      await newPost.save();
      return res.status(200).send({
        success: true,
        Message: "Your post has been processed to the admin",
      });
    }
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
