const mongoose = require("mongoose");

const dbConnect = () => {
    const uri = process.env.MONGODB_URL;
    console.log("Connecting to:", uri); // Debug line

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
        console.log("Issue in Connection");
        console.error(err.message);
        process.exit(1);
    });
};

module.exports = dbConnect;
