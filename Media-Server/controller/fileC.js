const File = require("../Model/FileM")
const cloudinary = require("cloudinary").v2;
require("dotenv").config();


exports.localFileUpload = async (req, res) => {
    try {
        //from client to server....

        //to reteive the file from request
        const file = req.files.file//<-- (.file is the name)
        console.log("File Loaded " + file);

        //to assign the path to store file and give name
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path-->", path);

        //to store on the server
        file.mv(path, (err) => {
            console.log(err);
        })

        res.json({
            success: true,
            message: "File Uploaded on local Server"
        })

    } catch (error) {
        console.log("File Uploaded failed on local Server");
        console.log(error);

    }
}

//to put image on Cloudinary:
async function uploadFileToCloudinary(file, folder, quality) {
    const option = { folder, resource_type: "auto" };

    if (quality) {
        option.quality = quality;
    }

    console.log("file-path", file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, option)
}

//to check the file type -->
function isfiletypeSupported(type, Supported_type) {
    return Supported_type.includes(type);
}

//image Upload:-->

exports.imageupload = async (req, res) => {
    try {
        //Fetching the data-->
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile
        console.log(file);

        console.log("req.files:", req.files);

        // Validation on file-->
        const Supported_type = ["jpg", "png", "jpeg"];
        const identify_type = file.name.split('.')[1].toLowerCase();

        if (!isfiletypeSupported(identify_type, Supported_type)) {
            return res.json(400)({
                success: false,
                message: "File Type not supported"
            })
        }

        //if valid file is uploaded-->
        const response = await uploadFileToCloudinary(file, "First_App");
        console.log(response);
        //To make Entry in DB:-
        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            message: "Image uploaded to Cloudinary",
            imageUrl: response.secure_url
        });




    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went Wrong"
        });



    }
}
exports.videoupload = async (req, res) => {
    try {
        //Fetching the data-->
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        // Validation on file-->
        const Supported_type = ["mp4", "mov"];
        const identify_type = file.name.split('.')[1].toLowerCase();

        if (!isfiletypeSupported(identify_type, Supported_type)) {
            return res.json(400)({
                success: false,
                message: "File Type not supported"
            })
        }

        //if valid file is uploaded-->
        const response = await uploadFileToCloudinary(file, "First_App");
        console.log(response);
        //To make Entry in DB:-
        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        return res.status(200).json({
            success: true,
            message: "Video uploaded to Cloudinary",
            imageUrl: response.secure_url
        });


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went Wrong"
        })

    }
}
exports.imageReduceupload = async (req, res) => {
    try {
        //Fetching the data-->
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile
        console.log(file);

        // Validation on file-->
        const Supported_type = ["jpg", "png", "jpeg"];
        const identify_type = file.name.split('.')[1].toLowerCase();

        if (!isfiletypeSupported(identify_type, Supported_type)) {
            return res.json(400)({
                success: false,
                message: "File Type not supported"
            })
        }

        //if valid file is uploaded-->
        const response = await uploadFileToCloudinary(file, "First_App", 50);
        console.log(response);
        //To make Entry in DB:-
        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            message: "Image uploaded with Size Reduce to Cloudinary",
            imageUrl: response.secure_url
        });




    } catch (error) {
        console.log(error);
        return res.json(400)({
            success: false,
            message: "Something went Wrong"
        })

    }
}














