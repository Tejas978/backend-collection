const express = require("express");
const app = express();

const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware
const cookieParser = require("cookie-parser")
app.use(cookieParser());

app.use(express.json());

// Routes
const user = require("./router/user");
// const cookieParser = require("cookie-parser");
app.use("/api/v1",user);

// Database connection
require("./config/database").connect();

// Start server
app.listen(PORT, () => {
    console.log(`Server Connected With Port ${PORT}`);
    console.log("Mongo URI:", process.env.MONGO_URL);

});
