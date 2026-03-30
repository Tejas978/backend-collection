const express = require("express")
const router = express.Router();

const{sign_UP} = require("../controller/signed")
const{Logined} = require("../controller/login")
const{auth,isStudent,isAdmin} = require("../Middleware/AuthM")

router.post("/sign_Up",sign_UP)
router.post("/login_Up",Logined)
//Verification

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Testing Auth Portal"
    })
})
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Student Portal"
    })
})
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Admin Portal"
    })
})


module.exports = router;
