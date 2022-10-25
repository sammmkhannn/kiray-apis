import express from "express";
import {
  getAllProductsAndPlans,
  createProduct,
  createPlan,
  createCustomerAndSubscription,
  updatePlan,
  getSubscriptions,
  getAllTransactions,
} from "../utils/stripe-api-function.js";
const router = express.Router();

/* Place all routes here */
router.get("/", (req, res) => {
  try {
    getAllProductsAndPlans().then((products) => {
      res.status(200).send({ success: true, products: products });
    });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
});

router.post("/createProduct", (req, res) => {
  try {
    createProduct(req.body).then(() => {
      return res
        .status(200)
        .send({ success: true, Message: "Product created!" });
    });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.messge });
  }
});

router.post("/createPlan", (req, res) => {
  try {
    createPlan(req.body).then(() => {
      res.status(200).send({ success: true, Message: "Created" });
    });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
});

router.post("/processPayment", (req, res) => {
  try {
    createCustomerAndSubscription(req.body)
      .then(() => {
        return res
          .status(200)
          .send({ success: true, Message: "Payment Succeed!" });
      })
      .catch((err) => {
        return res.status(400).send({ success: false, Message: err.message });
      });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
});

router.put("/updatePlan", (req, res) => {
  let planId = req.params.planId;
  try {
    updatePlan(planId, req.body)
      .then((plan) => {
        return res
          .status(200)
          .send({ success: true, Message: "plan has been updated!", plan });
      })
      .catch((err) => {
        return res.status(400).send({ success: false, Message: err.message });
      });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
});

router.get("/subscriptions", (req, res) => {
  try {
    getSubscriptions()
      .then((subscriptions) => {
        return res.status(200).send({ success: true, subscriptions });
      })
      .catch((err) => {
        return res.status(400).send({ success: false, Message: err.message });
      });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
});

router.get("/admin-income", (req, res) => {
  try {
    getAllTransactions()
      .then((transactions) => {
        if (transactions.data.length == 0) {
          return res.status(200).send({ success: true, income: 0 });
        } else {
          let transactionAmounts = transactions.data.map(
            (transaction) => transaction.amount
          );
          let income = transactionAmounts.reduce((amount, sum) => sum + amount);
          return res.status(200).send({ success: true, transactions, income });
        }
      })
      .catch((err) => {
        return res.status(400).send({ success: true, Message: err.message });
      });
  } catch (err) {
    return res.status(500).send({ success: false, Message: err.message });
  }
});
export default router;
