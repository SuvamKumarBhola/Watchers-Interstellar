const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    neo_reference_id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    miss_distance_km: { type: Number },
    velocity_kmph: { type: Number },
    is_potentially_hazardous: { type: Boolean },
    close_approach_date: { type: String },
    riskScore: { type: Number },
  },
  { timestamps: true }
);

watchlistSchema.index({ user: 1, neo_reference_id: 1 }, { unique: true });

module.exports = mongoose.model("Watchlist", watchlistSchema);
