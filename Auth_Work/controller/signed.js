const bcrypt = require("bcrypt");
const userM = require("../model/AuthM.js"); 

exports.sign_UP = async (req, res) => {
    try {
        const { name, email, Password, role } = req.body;
        // Check if user already exists
        const check_em = await userM.findOne({ email });
        if (check_em) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        // Hash the password
        let hasPass;
        try {
            hasPass = await bcrypt.hash(Password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in password creation",
            });
        }

        // Create user
        const user = await userM.create({
            name,
            email,
            Password: hasPass,
            role,
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in registration",
        });
    }
};
