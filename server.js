import express from "express";
import cors from "cors";
import { URL } from "url";
import compression from "compression";
import enforce from "express-sslify";

if (process.env.NODE_ENV !== "production") await import("dotenv/config.js");
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("WARNING: secret Stripe key not found!");
}

import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use(cors());

if (process.env.NODE_ENV === "production") {
  const pathToClientBuild = new URL("./client/build", import.meta.url).pathname;
  const pathToIndexHtml = new URL("./client/build/index.js", import.meta.url)
    .pathname;

  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(pathToClientBuild));

  app.get("*", function (req, res) {
    res.sendFile(pathToIndexHtml);
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log("Server running on port", port);
});

app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
