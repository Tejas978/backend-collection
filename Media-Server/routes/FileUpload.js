const express = require("express");
const router  = express.Router();

const {localFileUpload,imageupload,videoupload,imageReduceupload} = require("../controller/fileC")

router.post("/localFileUpload",localFileUpload)
router.post("/imageuploadonC",imageupload)
router.post("/videouploadonC",videoupload)
router.post("/imageReduceuploadonC",imageReduceupload)


module.exports = router;

