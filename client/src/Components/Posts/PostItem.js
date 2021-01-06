import React from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, deletePost, removeLike } from "../../Redux/Actions/post";

const PostItem = ({
  post: { _id, text, name, user, avatar, likes, comments, date },
}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="DD/MM/YYYY">{date}</Moment>{" "}
          </p>
          <button
            type="button"
            className="btn btn-light"
            onClick={(e) => dispatch(addLike(_id))}
          >
            <i className="fas fa-thumbs-up"></i>{" "}
            {likes.length > 0 && (
              <span className="likes-count">{likes.length}</span>
            )}
          </button>
          {/* <button
            type="button"
            className="btn btn-light"
            onClick={(e) => dispatch(removeLike(_id))}
          >
            <i className="fas fa-thumbs-down"></i>
          </button> */}
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={(e) => dispatch(deletePost(_id))}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
