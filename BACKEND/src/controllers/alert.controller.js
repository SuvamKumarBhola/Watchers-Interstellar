const axios = require("axios");
const Watchlist = require("../models/Watchlist");

const getAlerts = async (req, res) => {
  try {
    const type = req.query.type || "watchlist";

    // ---------- GLOBAL ALERTS ----------
    if (type === "global") {

      const today = new Date();
      const end = new Date();
      end.setDate(today.getDate() + 7);

      const startDate = today.toISOString().split("T")[0];
      const endDate = end.toISOString().split("T")[0];

      const response = await axios.get(
        "https://api.nasa.gov/neo/rest/v1/feed",
        {
          params: {
            start_date: startDate,
            end_date: endDate,
            api_key: process.env.NASA_API_KEY,
          },
        }
      );

      const neoData = response.data.near_earth_objects;
      const alerts = [];

      for (const date in neoData) {
        neoData[date].forEach((asteroid) => {
          const approach = asteroid.close_approach_data[0];

          alerts.push({
            neo_reference_id: asteroid.neo_reference_id,
            name: asteroid.name,
            close_approach_date: approach.close_approach_date,
            miss_distance_km: Number(
              approach.miss_distance.kilometers
            ),
            is_potentially_hazardous:
              asteroid.is_potentially_hazardous_asteroid,
          });
        });
      }

      return res.json({
        type: "global",
        count: alerts.length,
        alerts,
      });
    }

    // ---------- WATCHLIST ALERTS ----------
    const list = await Watchlist.find({ user: req.userId });

    const alerts = [];

    const today = new Date();
    const limit = new Date();
    limit.setDate(today.getDate() + 7);

    for (const item of list) {

      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${item.neo_reference_id}`,
        {
          params: {
            api_key: process.env.NASA_API_KEY,
          },
        }
      );

      const asteroid = response.data;

      if (!asteroid.close_approach_data.length) continue;

      const approach = asteroid.close_approach_data[0];
      const approachDate = new Date(
        approach.close_approach_date
      );

      if (approachDate >= today && approachDate <= limit) {

        alerts.push({
          neo_reference_id: asteroid.neo_reference_id,
          name: asteroid.name,
          close_approach_date: approach.close_approach_date,
          miss_distance_km: Number(
            approach.miss_distance.kilometers
          ),
        });
      }
    }

    res.json({
      type: "watchlist",
      count: alerts.length,
      alerts,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Alert fetch failed" });
  }
};

module.exports = { getAlerts };
