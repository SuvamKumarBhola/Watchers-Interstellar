const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  addHistory,
  getMyHistory,
} = require("../controllers/history.controller");

router.post("/", auth, addHistory);   // save history
router.get("/", auth, getMyHistory);  // get history

module.exports = router;
