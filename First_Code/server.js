// to Create an Express App 
const express = require('express');
const app = express();
//use body parser for POST data understanding in postman or anywhere else
const bodyParser = require("body-parser");
app.use(bodyParser.json());
//to assign an PORT
app.listen(4000,()=>{console.log("Server Started at the port no. 4000")
});
//get Request
app.get('/',(request,response)=>{
    response.send("Hello This is My First app");
})
//POST Request
app.post('/api/cars',(request,response)=>{
    const {name,brand} = request.body;
    console.log(name);
    console.log(brand);
    response.send("Car Data Saved")
})
//To Connect the Express(Server) to the Database....
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,    //compulsory
  useUnifiedTopology: true  //compulsory
})
.then(() => console.log("Connection Successful"))
.catch((error) => console.log("Received an error", error));
