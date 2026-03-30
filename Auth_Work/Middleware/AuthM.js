const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // console.log("cookies", req.cookies.token);
    // console.log("body", req.body.token);
// console.log("Auth Header:", req.header("Authorization"));
console.log("Verifying with:", process.env.JWT_SECRET);


    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");



    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }
    try {

      // console.log("Token received:", token);

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      req.user = payload;
      next();
      
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token Invalid!",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "Path is for Student Only"
      })
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Token Error !!"
    })
  }
}
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Path is for Admin Only"
      })
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Token Error !!"
    })
  }
}