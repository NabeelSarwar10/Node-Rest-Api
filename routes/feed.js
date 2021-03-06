const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");

const router = express.Router();

// GET /feed/posts
router.get("/posts", feedController.getPosts);
// POST /feed/posts
router.post(
  "/posts",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPosts
);

router.get("/post/:postId", feedController.getPost);

router.put("/post/:postId", feedController.updatePost);

router.delete("/post/:postId", feedController.deletePost);

module.exports = router;
