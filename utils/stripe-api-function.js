/* Server Side -- Stripe API calls */
import Stripe from "stripe";
import UTILS from "./format-numbers.js";
const stripe = Stripe(
  "sk_test_51JqCB5KP5kGmvDfgbGjP66YmcM1kTpupaEK7NSSa8DvClmKAvTsgjqfdoUke1KkxzhMPyI5EjmFuSDRtQaDOq5ze00AcZgjfBB"
);

export function getAllProductsAndPlans() {
  return Promise.all([stripe.products.list({}), stripe.plans.list({})]).then(
    (stripeData) => {
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
        const filteredPlans = plans.filter((plan) => {
          return plan.product === product.id;
        });
        product.plans = filteredPlans;
      });

      return products;
    }
  );
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

export async function createCustomerAndSubscription(requestBody) {
  let token = await stripe.tokens.create({
    card: {
      number: req.body.number,
      exp_month: req.body.exp_month,
      exp_year: req.body.exp_year,
      cvc: req.body.cvc,
    },
  });

  return stripe.customers
    .create({
      source: token,
      email: requestBody.customerEmail,
    })
    .then((customer) => {
      stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            plan: requestBody.planId,
          },
        ],
      });
    });
}

export function updatePlan(planId, requestBody) {
  return stripe.plans.update(planId, requestBody);
}

export function getSubscriptions() {
  return stripe.subscriptions.list({});
}

export function getAllTransactions() {
  return stripe.balanceTransactions.list({});
}
