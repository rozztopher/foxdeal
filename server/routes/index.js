const router = require("express").Router();
const auth = require("./jwtAuth");
const partner = require("./partner");
const user = require("./user");
const dashboard = require("./dashboard");
const products = require("./products");

router.use("/auth", auth);
router.use("/partner", partner);
router.use("/user", user);
router.use("/dashboard", dashboard);
router.use("/products", products);

module.exports = router;
