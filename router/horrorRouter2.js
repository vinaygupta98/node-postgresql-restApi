const { Router } = require("express");
const router = Router();
const horrorController2 = require("../controllers/horrorController2");
// get ALL

router.get("/", horrorController2.getAllHorrors);
router.get("/:id", horrorController2.getHorrorById);
router.post("/", horrorController2.addHorror);
router.put("/:id", horrorController2.updateHorror);
router.delete("/:id", horrorController2.deleteHorror);

module.exports = router;
