const axios = require("axios");


const {
  calculateRiskScore,
  getRiskLevel,
} = require("../utils/riskCalculator");

// ------------------ FEED API ------------------
const getAsteroidFeed = async (req, res) => {
  try {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

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
    const result = [];

    for (const date in neoData) {
      neoData[date].forEach((asteroid) => {
        const approach = asteroid.close_approach_data[0];

        const riskScore = calculateRiskScore({
          miss_distance_km: Number(
            approach.miss_distance.kilometers
          ),
          diameter_min_km:
            asteroid.estimated_diameter.kilometers
              .estimated_diameter_min,
          diameter_max_km:
            asteroid.estimated_diameter.kilometers
              .estimated_diameter_max,
          is_potentially_hazardous:
            asteroid.is_potentially_hazardous_asteroid,
        });

        const riskLevel = getRiskLevel(riskScore);

        result.push({
          neo_reference_id: asteroid.neo_reference_id,
          name: asteroid.name,
          absolute_magnitude_h: asteroid.absolute_magnitude_h,

          close_approach_date: approach.close_approach_date,

          miss_distance_km: Number(
            approach.miss_distance.kilometers
          ),

          velocity_kmph: Number(
            approach.relative_velocity.kilometers_per_hour
          ),

          estimated_diameter_km: {
            min: asteroid.estimated_diameter.kilometers
              .estimated_diameter_min,
            max: asteroid.estimated_diameter.kilometers
              .estimated_diameter_max,
          },

          estimated_diameter_miles: {
            min: asteroid.estimated_diameter.miles
              .estimated_diameter_min,
            max: asteroid.estimated_diameter.miles
              .estimated_diameter_max,
          },

          is_potentially_hazardous:
            asteroid.is_potentially_hazardous_asteroid,

          riskScore,
          riskLevel,
        });
      });
    }

    res.status(200).json({
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch asteroid data" });
  }
};

// ------------------ LOOKUP BY ID ------------------
const getAsteroidById = async (req, res) => {
  try {
    const neoId = req.params.id;

    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/${neoId}`,
      {
        params: {
          api_key: process.env.NASA_API_KEY,
        },
      }
    );

    const asteroid = response.data;
    const approach = asteroid.close_approach_data[0];

    const riskScore = calculateRiskScore({
      miss_distance_km: Number(
        approach.miss_distance.kilometers
      ),
      diameter_min_km:
        asteroid.estimated_diameter.kilometers
          .estimated_diameter_min,
      diameter_max_km:
        asteroid.estimated_diameter.kilometers
          .estimated_diameter_max,
      is_potentially_hazardous:
        asteroid.is_potentially_hazardous_asteroid,
    });

    const riskLevel = getRiskLevel(riskScore);

    res.json({
      neo_reference_id: asteroid.neo_reference_id,
      name: asteroid.name,
      absolute_magnitude_h: asteroid.absolute_magnitude_h,

      close_approach_date: approach.close_approach_date,

      miss_distance_km: Number(
        approach.miss_distance.kilometers
      ),

      velocity_kmph: Number(
        approach.relative_velocity.kilometers_per_hour
      ),

      estimated_diameter_km: {
        min: asteroid.estimated_diameter.kilometers
          .estimated_diameter_min,
        max: asteroid.estimated_diameter.kilometers
          .estimated_diameter_max,
      },

      estimated_diameter_miles: {
        min: asteroid.estimated_diameter.miles
          .estimated_diameter_min,
        max: asteroid.estimated_diameter.miles
          .estimated_diameter_max,
      },

      is_potentially_hazardous:
        asteroid.is_potentially_hazardous_asteroid,

      riskScore,
      riskLevel,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch asteroid" });
  }
};

module.exports = {
  getAsteroidFeed,
  getAsteroidById,
};
