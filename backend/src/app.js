const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const perangkatRoutes = require("./routes/perangkat.routes");
const kerusakanRoutes = require("./routes/kerusakan.routes");
const userRoutes = require("./routes/user.routes");
const jadwalRoutes = require("./routes/jadwal.routes");

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/perangkat", perangkatRoutes);
app.use("/api/kerusakan", kerusakanRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jadwal", jadwalRoutes);   
module.exports = app;