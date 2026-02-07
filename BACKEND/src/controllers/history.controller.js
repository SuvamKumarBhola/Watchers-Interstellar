const RecentHistory = require("../models/RecentHistory");

const addHistory = async (req, res) => {
  try {
    const { neo_reference_id, name } = req.body;

    if (!neo_reference_id || !name) {
      return res.status(400).json({
        message: "neo_reference_id and name are required",
      });
    }

    await RecentHistory.findOneAndUpdate(
      {
        user: req.userId,
        neo_reference_id,
      },
      {
        name,
        viewedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(201).json({
      message: "History added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add history",
    });
  }
};

const getMyHistory = async (req, res) => {
  try {
    const history = await RecentHistory.find({
      user: req.userId,
    })
      .sort({ viewedAt: -1 })
      .limit(10);

    res.json({
      count: history.length,
      data: history,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

module.exports = {
  addHistory,
  getMyHistory,
};
