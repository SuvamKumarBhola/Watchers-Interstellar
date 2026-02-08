const cron = require("node-cron");
const axios = require("axios");
const Alert = require("./models/Alert");
const { calculateRiskScore, getRiskLevel } = require("./utils/riskCalculator");

const initScheduler = () => {
    console.log("Initializing Scheduler...");

    // Run daily at 00:00
    cron.schedule("0 0 * * *", async () => {
        console.log("Running Daily Asteroid Check...");
        try {
            const today = new Date().toISOString().split("T")[0];
            const response = await axios.get(
                "https://api.nasa.gov/neo/rest/v1/feed",
                {
                    params: {
                        start_date: today,
                        end_date: today,
                        api_key: process.env.NASA_API_KEY,
                    },
                }
            );

            const neoData = response.data.near_earth_objects[today];
            if (!neoData) return;

            const hazardousAsteroids = neoData.filter(
                (a) => a.is_potentially_hazardous_asteroid
            );

            for (const asteroid of hazardousAsteroids) {
                const approach = asteroid.close_approach_data[0];
                const riskScore = calculateRiskScore({
                    miss_distance_km: Number(approach.miss_distance.kilometers),
                    diameter_min_km: asteroid.estimated_diameter.kilometers.estimated_diameter_min,
                    diameter_max_km: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
                    is_potentially_hazardous: true
                });
                const riskLevel = getRiskLevel(riskScore);

                // Create Global Alert
                const alertExists = await Alert.findOne({
                    asteroid_id: asteroid.neo_reference_id,
                    createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } // Check if alert created today
                });

                if (!alertExists) {
                    await Alert.create({
                        type: "global",
                        message: `Hazardous Asteroid ${asteroid.name} approaching! Risk Level: ${riskLevel}`,
                        asteroid_id: asteroid.neo_reference_id,
                        severity: riskLevel
                    });
                    console.log(`Alert created for ${asteroid.name}`);
                }
            }

        } catch (error) {
            console.error("Scheduler Error:", error.message);
        }
    });
};

module.exports = initScheduler;
