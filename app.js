const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// * Route Variables

const tourRoutes = require("./routes/tours.route");

// * Middleware

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Route Is Working.");
})

app.use('/tours', tourRoutes);

module.exports = app;