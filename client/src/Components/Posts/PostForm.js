import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../Redux/Actions/post";
const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  return (
    <div className="container">
      {/* <Alert /> */}
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Add Something...</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addPost({ text }));
            setText("");
          }}
        >
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Post" />
        </form>
      </div>
    </div>
  );
};

export default PostForm;
