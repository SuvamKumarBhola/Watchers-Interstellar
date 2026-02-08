const Watchlist = require("../models/Watchlist");

const addToWatchlist = async (req, res) => {
  try {
    console.log("Saving to Wishlist:", req.body);
    const {
      neo_reference_id,
      name,
      miss_distance_km,
      velocity_kmph,
      is_potentially_hazardous,
      close_approach_date,
      riskScore
    } = req.body;

    const item = await Watchlist.create({
      user: req.userId,
      neo_reference_id,
      name,
      miss_distance_km,
      velocity_kmph,
      is_potentially_hazardous,
      close_approach_date,
      riskScore
    });

    res.status(201).json(item);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already in watchlist" });
    }
    res.status(500).json({ message: "Add failed" });
  }
};

const getMyWatchlist = async (req, res) => {
  try {
    console.log("Fetching Wishlist for user:", req.userId);
    const list = await Watchlist.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    const { neoId } = req.params;

    await Watchlist.deleteOne({
      user: req.userId,
      neo_reference_id: neoId,
    });

    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  addToWatchlist,
  getMyWatchlist,
  removeFromWatchlist,
};
