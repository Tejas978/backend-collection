const Post = require("../model/blogM");

exports.create = async (req, res) => {
    try {
        const { title, body } = req.body;
        const response = await Post.create({ title, body })
        res.json(
            {
                success: true,
                data: response,
                message: 'entry created successfully'
            }
        )
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500)
            .json({
                success: false,
                data: "Internal Server Error",
                message: err.message,
            })

    }
}
exports.getall = async (req, res) => {
   try{
        // const posts = await Post.find();
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            data : posts,
        })
    }
    catch(err)
    {
        return res.status(400).json({
            error : "Error while Fetching Post "
        })
    }
}