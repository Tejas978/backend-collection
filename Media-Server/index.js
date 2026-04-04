const express = require("express");
const app = express();

require("dotenv").config()

const PORT = process.env.PORT || 3000;

app.use(express.json());

const fileUpload = require("express-fileupload")
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

require("./Config/database").connect();

const cloudinary = require("./Config/cloudinary")
cloudinary.cloudinaryConnect();

const Upload = require("./routes/FileUpload")
app.use("/api/v1/upload",Upload);

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}` );
    
})

