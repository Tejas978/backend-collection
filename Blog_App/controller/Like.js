const Like = require("../Model/like");
const Post = require("../model/blogM");

exports.like = async (req, res) => {
    try {
        const { post, user } = req.body;
        const likke = new Like({
            post,
            user
        });

        const savedLike = await likke.save();

        const updatelike = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike._id } }, { new: true })
                            .populate("likes")
                            .exec();
        res.json({
            post: updatelike
        })


    } catch (err) {
        console.error("Error in commentM:", err); // ✅ Add this
        return res.status(500).json({
            error: "Error while creating comment",
        })
    }
}
exports.unlike = async (req, res) => {
    try {
    const { post, like } = req.body;

    // find and delete the from like collection
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

    // update the post collection
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { new: true }
    );

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error While unLike Post",
    });
  }

}
