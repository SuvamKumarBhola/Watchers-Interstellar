const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false, // Can be system-wide or user-specific
    },
    type: {
        type: String,
        enum: ["watchlist", "global", "system"],
        default: "global",
    },
    message: {
        type: String,
        required: true,
    },
    asteroid_id: {
        type: String,
    },
    severity: {
        type: String, // HIGH, MEDIUM, LOW
        default: "LOW",
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Alert", alertSchema);
