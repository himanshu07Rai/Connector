import React from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../Redux/Actions/post";
const CommentItem = ({
  postID,
  comment: { _id, text, name, avatar, user, date },
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
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
        </div>
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => dispatch(deleteComment(postID, _id))}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
