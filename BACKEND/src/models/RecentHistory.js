const mongoose = require("mongoose");

const recentHistorySchema = new mongoose.Schema(
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

    viewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// one entry per asteroid per user
recentHistorySchema.index(
  { user: 1, neo_reference_id: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "RecentHistory",
  recentHistorySchema
);
