const router = require("express").Router();
const auth = require("../middleware/auth");
const { getAlerts } = require("../controllers/alert.controller");

// auth only needed for watchlist mode
router.get("/", auth, getAlerts);

module.exports = router;


