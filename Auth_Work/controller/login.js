const bcryptt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userM = require("../model/AuthM.js");
require("dotenv").config();

exports.Logined = async (req, res) => {
    console.log("Signing with:", process.env.JWT_SECRET);
// console.log("Generated token:", token);

    try {
        const { email, Password } = req.body;

        // Validate input
        if (!email || !Password) {
            return res.status(400).json({
                success: false,
                message: "Please fill details carefully"
            });
        }

        // Check if user exists
        let user = await userM.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist",
            });
        }
        // Compare password using bcryptt
        const isMatch = await bcryptt.compare(Password, user.Password);
        if (isMatch) {
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role,
            };
            const token = jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn: "2h" ,
            });

            user = user.toObject();
            user.token = token;
            user.Password = undefined;

            const options = {
                expires: new Date(Date.now() +  30000000),
                httpOnly: true,
            };

            // return res.status(200).json({
            //     success: true,
            //     token,
            //     user,
            //     message: "User logged in successfully"
            // });
            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully"
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Password does not match",
            });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};