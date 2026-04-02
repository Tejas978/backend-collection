const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT || 8000;

const Blog = require("./Routes/routes")
app.use("/api/v1",Blog)

app.listen(PORT, () => {
    console.log(`Server Connected With ${PORT}`);
});
const dbconnect = require("./config/database");
dbconnect();

app.get("/",(req,res)=>{
    res.send("Welcome Tejas");
    
})