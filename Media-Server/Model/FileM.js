const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    },
});

// Post-save hook to send mail
fileSchema.post("save", async function (doc) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: `"Tejas OP" <${process.env.MAIL_USER}>`,
            to: doc.email,
            subject: "New File Uploaded Successfully",
            html: `
  <h2>Hello Tejas,</h2>
  <p>Your file "<strong>${doc.name}</strong>" was uploaded successfully.</p>
  <p>View it here: <a href="${doc.imageUrl}" target="_blank">${doc.imageUrl}</a></p>
`,


        });

        console.log("Mail sent:", info.messageId);
    } catch (error) {
        console.error("Mail error:", error);
    }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
