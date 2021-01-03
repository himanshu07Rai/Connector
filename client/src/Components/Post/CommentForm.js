import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../Redux/Actions/post";

const CommentForm = (props) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addComment(props.postID, { text }));
            setText("");
          }}
        >
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comment on this post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Post" />
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
