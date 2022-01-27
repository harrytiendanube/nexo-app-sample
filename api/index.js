const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const { saveToken } = require("./db");
const { getStoreAndAccessTokeByCode } = require("./utils");
const { getProducts } = require("./tiendanube");

require("./passport");

app.use(cors());

const port = 3200;

app.get("/", async (_, res) => {
  res.json({ status: "hi mom! 🐣" });
});

app.get("/install", async (req, res) => {
  if (!req.query.code) {
    return res.sendStatus(404);
  }

  const storeToken = await getStoreAndAccessTokeByCode(req.query.code);
  if(!storeToken){
    return res.sendStatus(401);
  }

  const success = await saveToken(storeToken.storeId, storeToken.accessToken);
  
  res.json({ success });
});

app.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json(req.user);
  }
);





app.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const products = await getProducts(req.user);
    res.json(products);
  }
);


app.listen(port, () => {
  console.log("Start service in http://localhost:" + port);
});
