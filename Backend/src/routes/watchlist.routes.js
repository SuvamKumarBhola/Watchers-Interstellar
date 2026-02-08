const router = require("express").Router();

const auth = require("../middleware/auth");
const {
  addToWatchlist,
  getMyWatchlist,
  removeFromWatchlist,
} = require("../controllers/watchlist.controller");

router.post("/", auth, addToWatchlist);
router.get("/", auth, getMyWatchlist);
router.delete("/:neoId", auth, removeFromWatchlist);

module.exports = router;
