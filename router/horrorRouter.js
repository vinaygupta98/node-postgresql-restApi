const { Router } = require("express");
const router = Router();
const horrorController = require("../controllers/horrorController");
// get ALL

router.get("/", horrorController.getAllHorrors);
router.get("/:id", horrorController.getHorrorById);
router.post("/", horrorController.addHorror);
router.put("/:id", horrorController.updateHorror);
router.delete("/:id", horrorController.deleteHorror);

module.exports = router;
