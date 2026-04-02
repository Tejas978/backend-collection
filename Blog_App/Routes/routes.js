const express = require("express")
const router = express.Router();

const { create, getall } = require("../controller/create")
const { commentM } = require("../controller/Comment")
const { like, unlike } = require("../controller/Like")

//Remember to use router whose data is made (the blue one in link)
// one by one create the link

router.post("/posts/create", create);
router.get("/posts", getall);
router.post("/likes/like", like);
router.post("/likes/unlike", unlike);
router.post("/comments/create", commentM);

module.exports = router;