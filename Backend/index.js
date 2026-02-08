require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.routes");
const watchlistRoutes = require("./src/routes/watchlist.routes");
const asteroidRoutes = require("./src/routes/asteroid.routes");
const alertRoutes = require("./src/routes/alert.routes");
const historyRoutes = require("./src/routes/history.routes");
const initScheduler = require("./src/scheduler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/asteroids", asteroidRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


app.listen(PORT, () => {
  console.log("Server started on", PORT);
  initScheduler();
});
