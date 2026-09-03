const mongoose = require("mongoose");
const Post = require("../models/postModel");

// GET /api/posts - Lấy toàn bộ danh sách bài viết
async function getPosts(req, res) {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Không thể lấy danh sách bài viết." });
    }
}

// GET /api/posts/:slug - Tìm bài viết theo slug
async function getPostBySlug(req, res) {
    try {
        const post = await Post.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ message: "Không tìm thấy bài viết." });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Không thể lấy bài viết." });
    }
}

// POST /api/posts - Thêm bài viết mới (Auth)
async function createPost(req, res) {
    try {
        const { slug, title, description } = req.body;
        if (!slug || !title || !description) {
            return res.status(400).json({ message: "Slug, title và description là bắt buộc." });
        }

        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            return res.status(400).json({ message: "Slug này đã tồn tại." });
        }

        const post = await Post.create({ slug, title, description });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Không thể tạo bài viết." });
    }
}

// PATCH /api/posts/:slug - Cập nhật bài viết (Auth)
async function updatePost(req, res) {
    try {
        const { title, description } = req.body;
        const post = await Post.findOne({ slug: req.params.slug });

        if (!post) {
            return res.status(404).json({ message: "Không tìm thấy bài viết." });
        }

        if (title !== undefined) post.title = title;
        if (description !== undefined) post.description = description;

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Không thể cập nhật bài viết." });
    }
}

// DELETE /api/posts/:identifier - Xóa bài viết
async function deletePost(req, res) {
    try {
        const identifier = req.params.slug || req.params.id;

        if (!identifier) {
            return res.status(400).json({ message: "Thiếu ID hoặc Slug bài viết." });
        }

        let post = null;

        // 1. Nếu identifier là ObjectId hợp lệ của MongoDB, thử xóa theo ID trước
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            post = await Post.findByIdAndDelete(identifier);
        }

        // 2. Nếu không xóa được theo ID (hoặc identifier là chuỗi Slug), tìm xóa theo Slug
        if (!post) {
            post = await Post.findOneAndDelete({ slug: identifier });
        }

        if (!post) {
            return res.status(404).json({ message: "Không tìm thấy bài viết." });
        }

        res.json({ message: "Xóa bài viết thành công!" });
    } catch (error) {
        console.error("Delete Post Detailed Error:", error);
        res.status(500).json({ message: "Lỗi hệ thống khi xóa bài viết!" });
    }
}

module.exports = { 
    getPosts, 
    getPostBySlug, 
    createPost, 
    updatePost, 
    deletePost 
};