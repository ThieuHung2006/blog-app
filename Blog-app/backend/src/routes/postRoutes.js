const express = require("express");
const router = express.Router();
const { getPosts, createPost, deletePost } = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

// Các tuyến đường bài viết
router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost); // Route xóa bài viết

module.exports = router;