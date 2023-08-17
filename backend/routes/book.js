const express = require("express");

const bookCtrl = require("../controllers/book");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const compress = require("../middleware/compress-config");

const router = express.Router();

// Routes POST
router.post("/", auth, multer, compress, bookCtrl.createBook);

router.post("/:id/rating", auth, bookCtrl.setBookRating);

// Routes GET
router.get("/", bookCtrl.getAllBook);
router.get("/bestrating", bookCtrl.getBestBook);
router.get("/:id", bookCtrl.getOneBook);

// Routes MAJ
router.put("/:id", auth, multer, bookCtrl.modifyBook);

// Routes DELETE
router.delete("/:id", auth, multer, bookCtrl.deleteBook);

module.exports = router;
