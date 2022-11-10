/* Server Side -- Stripe API calls */
import Stripe from "stripe";
import UTILS from "./format-numbers.js";
import User from "../models/User.model.js";

const stripe = Stripe(
  "sk_test_51JqCB5KP5kGmvDfgbGjP66YmcM1kTpupaEK7NSSa8DvClmKAvTsgjqfdoUke1KkxzhMPyI5EjmFuSDRtQaDOq5ze00AcZgjfBB"
);

export async function getAllProductsAndPlans() {
  const stripeData = await Promise.all([stripe.products.list({}), stripe.plans.list({})]);
  var products = stripeData[0].data;
  var plans = stripeData[1].data;
  plans = plans
    .sort((a, b) => {
      /* Sort plans in ascending order of price (amount)*/
      return a.amount - b.amount;
    })
    .map((plan) => {
      /* Format plan price (amount) */
      let amount = UTILS.formatUSD(plan.amount);
      return { ...plan, amount };
    });
  products.forEach((product) => {
    const filteredPlans = plans.filter((plan_1) => {
      return plan_1.product === product.id;
    });
    product.plans = filteredPlans;
  });
  return products;
}

export function createProduct(requestBody) {
  return stripe.products.create({
    name: requestBody.name,
    type: "service",
  });
}

export function createPlan(requestBody) {
  return stripe.plans.create({
    nickname: requestBody.planName,
    amount: UTILS.formatStripeAmount(requestBody.planAmount),
    interval: requestBody.planInterval,
    interval_count: parseInt(requestBody.planIntervalNumber),
    product: requestBody.productId,
    currency: "USD",
  });
}

export async function createCustomerAndSubscription(req) {
  let userId = req.params.userId;
  let user = await User.findOne({ _id: userId });
  let token = req.body.stripeToken;
  
  if (!user.customerId) {
    return stripe.customers
      .create({
        source:token,
        email: req.body.customerEmail,
      })
      .then(async (customer) => {
        user.customerId = customer.id;
        await save();
        stripe.subscriptions.create({
          customer: customer.id,
          items: [
            {
              price: req.body.planId,
            },
          ],
        });
      });
  } else {
    return stripe.subscriptions.create({
      customer: user.customerId,
      items: [
        {
          plan:req.body.planId,
        }
      ]
    })
  }
}


export function updatePrice(planId, amount) {
  // return stripe.prices.create({
  //   unit_amount: 20000,
  //   currency: 'usd',
  //   recurring: { interval: 'month' },
  //   product: 'prod_MgqVAhQu1iisv7'
  // });
  return  stripe.prices.update(
    'price_1LxSURKP5kGmvDfg5V2RRgte',
    {unit_amount: 20000,}
  );
  // return stripe.prices.retrieve(planId);
}

export function updatePlan(planId, requestBody) {
  
  let payload = {};
  requestBody.interval ? payload.interval = requestBody.interval : "";
  requestBody.amount ? payload.amount = requestBody.amount : "";

  return stripe.prices.update(planId,{unit_amount: 50000});

}

export function updateProduct(productId, requestBody) {
  let payload = {}
  requestBody.image ? payload.images = [requestBody.image] : "";
  requestBody.name ? payload.name = requestBody.name : "";
  requestBody.active ? payload.active = requestBody.active : "";
  return stripe.products.update(productId, payload);
}
export function getSubscriptions() {
  return stripe.subscriptions.list({});
}

export function getAllTransactions() {
  return stripe.balanceTransactions.list({});
}


export function updateSubsciption(subscriptionId, payload) {
  return stripe.subscriptions.update(
    subscriptionId,
    payload
  );
}