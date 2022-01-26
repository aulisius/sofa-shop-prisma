import _prisma from "@prisma/client";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import Express from "express";
import Stripe from "stripe";

dotenv.config();
dotenv.config({ path: ".env.local" });

let { PrismaClient } = _prisma;
const prisma = new PrismaClient();
const stripe = Stripe(process.env.API_STRIPE_KEY);

const app = Express();
app.use(bodyParser.json());

app.get("/products", async (req, res) => {
  let searchParams = req.query;
  let whereOptions = {};
  if (searchParams.color) {
    whereOptions.color = searchParams.color;
  }
  if (searchParams.minimumPrice) {
    let minimumPrice = searchParams.minimumPrice;
    if (whereOptions.price) {
      whereOptions.price.gte = Number(minimumPrice);
    } else {
      whereOptions.price = { gte: Number(minimumPrice) };
    }
  }
  if (searchParams.maximumPrice) {
    let maximumPrice = searchParams.maximumPrice;
    if (whereOptions.price) {
      whereOptions.price.lte = Number(maximumPrice);
    } else {
      whereOptions.price = { lte: Number(maximumPrice) };
    }
  }
  let result = await prisma.product.findMany({
    where: whereOptions,
  });
  res.json({ result });
});

app.post("/checkout", async (req, res) => {
  let payload = req.body;
  let products = await prisma.product.findMany({
    where: {
      id: { in: payload.products.map((product) => Number(product.id)) },
    },
  });
  let lineItems = products.map((product) => {
    let quantity = payload.products.find(
      (cartProduct) => Number(cartProduct.id) === product.id
    ).quantity;
    return {
      price_data: {
        currency: "INR",
        product_data: {
          name: product.name,
          description: `${product.name} ${product.color}`,
        },
        unit_amount: product.price * 100,
      },
      quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3000?payment=success`,
    cancel_url: `http://localhost:3000?payment=failure`,
  });
  res.json(session);
});

app.listen(8000, () => {
  console.log("App is running!");
});
