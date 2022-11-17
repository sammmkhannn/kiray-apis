import { createPlan,getAllPlans,updatePlan } from "../controllers/plan.controllers.js";
import express from "express";
const router = express.Router();
import { upload } from "../controllers/post.controllers.js";
// import {
//   getAllProductsAndPlans,
//   createCustomerAndSubscription,
//   updatePlan,
//   updateProduct,
//   updatePrice,
//   getSubscriptions,
//   getAllTransactions,
// } from "../utils/stripe-api-function.js";
// import Subscription from "../models/Subscription.model.js";
// import Product from "../models/Plan.model.js";
// import { upload } from "../controllers/post.controllers.js";
// const router = express.Router();

// /* Place all routes here */
// router.get("/", (req, res) => {
//   let freePosts = {
//     "Premium Gold": 50,
//     "Business Pack": 20,
//     "Free Trial": 2,
//   };

//   try {
//     getAllProductsAndPlans().then(async (products) => {
  
//       //modify the products just pick some useful data
//       //check if the products locally exist
//        let LocalProducts = await Product.find({});
      
//       if (LocalProducts.length == 0) {
//         let modifiedProducts = products.map((product) => {
//           let plan = {};
//           plan.image = product.images[0];
//           plan.name = product.name;
//           plan.productId = product.id;
//           plan.planId = product.plans.length > 0 ? product.plans[0].id : null;
//           plan.active = product.plans.length > 0 ? product.plans[0].active : null;
//           plan.amount = product.plans.length > 0 ? product.plans[0].amount : 0;
//           plan.interval =
//             product.plans.length > 0 ? product.plans[0].interval : null;
//           plan.freePosts = freePosts[plan.name];
//           return plan;
//         });
//         // //create the products locally
//         for (let product of modifiedProducts) {
//           let newProduct = new Product({
//             productId: product.productId,
//             planId: product.planId,
//             image: product.image,
//             name: product.name,
//             amount: product.amount,
//             active:product.active,
//             interval: product.interval,
//             freePosts: product.freePosts
//           });

//           await newProduct.save();
//         }
//         return res.status(200).send({ success: true, products: modifiedProducts });
//       } 
//       return res.status(200).send({ success: true, products:LocalProducts });
      
//     });
//   } catch (err) {
//     return res.status(500).send({ success: false, Message: err.message });
//   }
// });



// //TODO:needs to be modified and fixed
// router.post("/processPayment/:userId", async(req, res) => {
//   //create plans object
//   let date = new Date();

//   let products = await Product.find({});
//   let plans = {};
//   for (let product of products) {
//     plans[`${product.planId}`] = {
//       name: product.name,
//       freePosts: product.freePosts,
//       interval:product.interval
//     }
//   }
//   try {
//     createCustomerAndSubscription(req)
//       .then(async (subscription) => {
//         //create a local subscription just to communicate the data
//         let newSubscription = await Subscription({
//           userId:req.params.userId,
//           planId:req.body.planId,
//           planName: plans[planId].name,
//           issueDate: date.toLocaleDateString(),
//           expiryDate: new Date((new Date(date.toLocaleDateString()).setDate((new Date(sub.issueDate)).getDate() + plans[planId].interval))),
//           totalPosts: plans[planId].freePosts,
//           availablePosts: plans[planId].freePosts,
//           Active: true,
//         });
      
//         await newSubscription.save();
//         return res
//           .status(200)
//           .send({ success: true, Message: "Payment Succeed!" });
//       })
//       .catch((err) => {
//         return res.status(400).send({ success: false, Message: err.message });
//       });
//   } catch (err) {
//     return res.status(500).send({ success: false, Message: err.message });
//   }
// });

// router.put('/update-price/:planId', (req, res) => {
//   try {
//     updatePrice(req.params.planId, req.body.amount).then((response) => {
//       return res.status(200).send({ success: true, Message: "done",response });
//     })
//   } catch (err) {
//     return res.status(500).send({ success: false, Message: err.message });
//   }
// });
// //TODO: fix the issues
// router.put("/update-plan-and-product/:planId/:productId",upload.single('img'), (req, res) => {
//   let planId = req.params.planId;
//   let productId = req.params.productId;
//   try {
//     updatePlan(planId, req.body)
//       .then(async(plan) => {
//         //update the product details if any changes >
        
//         updateProduct(productId, req.body).then(async(response) => {
//           let query = {};
//         req.file ? query.image = req.file.filename : "";
//         req.body.name ? query.amount = req.body.name : "";
//         req.body.amount ? query.amount = req.body.amount : "";
//         req.body.active ? query.active = req.body.active : "";
//         req.body.interval ? query.interval = req.body.interval : "";
//         req.body.freePosts ? query.freePosts = req.body.freePosts : "";
//         await Product.updateOne({ planId: planId },query);
//           return res.status(200).send({success:true,Message:"Changes have been updated!"});
//         }).catch((err) => {
//           return res.status(400).send({ success: false, Message: "got an error while updating changes" });
//         })
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(400).send({ success: false, Message: err.message });
//       });
//   } catch (err) {
//     return res.status(500).send({ success: false, Message: err.message });
//   }
// });

// //done
// router.get("/subscriptions", (req, res) => {
//   try {
//     getSubscriptions()
//       .then((subscriptions) => {
//         return res.status(200).send({ success: true, subscriptions });
//       })
//       .catch((err) => {
//         return res.status(400).send({ success: false, Message: err.message });
//       });
//   } catch (err) {
//     return res.status(500).send({ success: false, Message: err.message });
//   }
// });


// //done 
// router.get("/admin-income", (req, res) => {
//   try {
//     getAllTransactions()
//       .then((transactions) => {
//         if (transactions.data.length == 0) {
//           return res.status(200).send({ success: true, income: 0 });
//         } else {
//           let transactionAmounts = transactions.data.map(
//             (transaction) => transaction.amount
//           );
//           let income = transactionAmounts.reduce((amount, sum) => sum + amount);
//           return res.status(200).send({ success: true, transactions, income });
//         }
//       })
//       .catch((err) => {
//         return res.status(400).send({ success: true, Message: err.message });
//       });
//   } catch (err) {
//     return res.status(500).send({ success: false, Message: err.message });
//   }
// });

router.post('/create',upload.single('image'), createPlan);
router.get('/all', getAllPlans);
router.put('/update/:plandId', updatePlan);

export default router;
