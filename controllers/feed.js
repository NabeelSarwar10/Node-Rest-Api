const { validationResult } = require("express-validator");

const Post = require("../models/post");
const { post } = require("../routes/feed");
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "This is the First post!",
        imageUrl: "images/pubg.png",
        creator: {
          name: "Nabeel",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPosts = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "validation failed, entered data is incorrect.",
      errors: errors.array(),
    });
  }
  const title = req.body.title;
  const content = req.body.content;
  const Post = new Post({
    title: title,
    content: content,
    creator: { name: "Nabeel" },
  });
  post.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: "Post created successfully!",
      post: result
    });
  });
};
