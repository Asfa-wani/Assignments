/*
 * IMPORTING DEPENDENCIES 
 */
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connection = require("./Server/db/connection");
const authRoutes = require("./Server/routes/authUser.js");

const PORT = process.env.PORT || 8080;

/**
 * DB CONNECTION
 */
connection();

/*
 * INITIALIZING EXPRESS APP
 */
const app = express();

/**
 * MIDDLEWARE
 */
app.use(express.json());
app.use(cors());

/**
 * CREATING APIS
 */

app.use("/api/authUser", authRoutes);

/*
 * STARTING APP
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});