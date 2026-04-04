const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
        console.error("Database connection failed");
        console.error(err);
        process.exit(1);
    });
};

module.exports = {connect};
