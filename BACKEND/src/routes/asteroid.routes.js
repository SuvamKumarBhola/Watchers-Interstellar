const express = require("express");
const router = express.Router();

const {
  getAsteroidFeed,getAsteroidById
} = require("../controllers/asteroid.controller");


router.get("/feed", getAsteroidFeed);
router.get("/:id", getAsteroidById);


module.exports = router;
