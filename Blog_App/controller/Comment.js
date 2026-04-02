const Comment = require("../model/commentM");
const Post = require("../model/blogM");
const { response } = require("express");

exports.commentM = async (req,res) => {
     try {
        // fetch data from request body 
        const { post, user, body } = req.body;

        // create comment object
        const comment = new Comment({
            post, user, body
        })

        // save the new comment object into the db 
        const savedComment = await comment.save();

        // Find the Post By Id and the new comment to its comment array 
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } },
            { new: true })
            .populate("comments") //Populates the comment array with the comments document
            .exec();

        res.json({
            post: updatedPost,
        })
    }
    catch (err) {
    console.error("Error in commentM:", err); // ✅ Add this
    return res.status(500).json({
        error : "Error while creating comment",            
    })
}

}