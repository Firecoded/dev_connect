const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @route Post api/posts
// @desc Create a post
// @access Private

router.post("/", [auth, [check("text", "Text is required").not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        const user = await User.findById(req.user.id).select("-password");

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        });
        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route GET api/posts
// @desc GET all posts
// @access Private

router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route GET api/posts/:id
// @desc GET a post by id
// @access Private

router.get("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                message: "Post not found",
            });
        }
        res.status(500).send("Server error");
    }
});

// @route DELETE api/posts/:id
// @desc Delete a post by id
// @access Private

router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        // check if user owns post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "User not authorized",
            });
        }

        await post.remove();
        res.json({ message: "Post removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                message: "Post not found",
            });
        }
        res.status(500).send("Server error");
    }
});

// @route PUT api/posts/like/:id --- Refactor
// @desc Like/unlike a post
// @access Private

router.put("/like/:id", auth, async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.id);
        if (!foundPost) {
            return res.status(404).json({ message: "No post found" });
        }
        const likeIndex = foundPost.likes.findIndex((l) => l.user.toString() === req.user.id);
        if (likeIndex === -1) {
            foundPost.likes.push({ user: req.user.id });
        } else {
            foundPost.likes.splice(likeIndex, 1);
        }

        await foundPost.save();
        res.json(foundPost.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route Post api/posts/comment/:id
// @desc Comment on a post
// @access Private

router.post("/comment/:id", [auth, [check("text", "Text is required").not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        };
        post.comments.unshift(newComment);
        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route Post api/posts/comment/:id/:comment_id
// @desc Delete comment
// @access Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Get comment from post
        const comment = post.comments.find((comment) => comment.id === req.params.comment_id);
        if (!comment) {
            return res.status(404).json({ message: "Comment does not exist" });
        }

        // check if user owns comment
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const commentIndex = post.comments.findIndex((comment) => comment.id === req.params.comment_id);
        post.comments.splice(commentIndex, 1);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// TODO: update comment

module.exports = router;
