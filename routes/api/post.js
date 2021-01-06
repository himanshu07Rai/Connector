const express = require("express");
const config = require("config");
const router = express.Router();
const auth = require("../../Middleware/auth");
const Profile = require("../../Models/Profile");
const User = require("../../Models/User");
const Post = require("../../Models/Post");

const { check, validationResult, body } = require("express-validator");
const { response } = require("express");

//@route     POST api/post
//@desc      create post
//@access    Private

router.post(
  "/",
  auth,
  check("text", "Text is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() });
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
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route     GET api/post
//@desc      get all post
//@access    Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); //receny : first
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route     GET api/post/:post_id
//@desc      Get post by id
//@access    Private

router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
});

//@route     DELETE api/post/:post_id
//@desc      Delete a post
//@access    Private

router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    //Check on user

    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorized" });

    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
});

//@route     PUT api/post/like/:post_id
//@desc      Like a post
//@access    Private

router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    //Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
      await post.save();
      // return res.status(400).json({ msg: "Post already liked" });
      return res.json(post.likes);
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route     PUT api/post/unlike/:post_id
//@desc      unlike a post
//@access    Private

// router.put("/unlike/:post_id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.post_id);
//     if (!post) return res.status(404).json({ msg: "Post not found" });

//     //Check if the post has already been liked
//     if (
//       post.likes.filter((like) => like.user.toString() === req.user.id)
//         .length === 0
//     ) {
//       return res.status(400).json({ msg: "Post not liked" });
//     }

//     //Get remove index
//     const removeIndex = post.likes
//       .map((like) => like.user.toString())
//       .indexOf(req.user.id);

//     post.likes.splice(removeIndex, 1);
//     await post.save();

//     res.json(post.likes);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

//@route     POST api/post/comment/:post_id
//@desc      Comment on a post
//@access    Private

router.post(
  "/comment/:post_id",
  auth,
  check("text", "Text is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() });
    }

    try {
      user = await User.findById(req.user.id).select("-password");

      const post = await Post.findById(req.params.post_id);
      if (!post) return res.status(404).json({ msg: "Post not found" });

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route     POST api/post/comment/:post_id/:comment_id
//@desc      Delete Comment on a post
//@access    Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
