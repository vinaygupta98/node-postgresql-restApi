const { Router } = require("express");
const router = Router();
const horrorController = require("../controllers/horrorController");
const horrorRouter = require("./horrorRouter");
const horrorRouter2 = require("./horrorRouter2");
// get ALL

router.use("/v1/horrors", horrorRouter);
router.use("/v2/horrors", horrorRouter2);

module.exports = router;
