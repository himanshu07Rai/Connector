import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Alert from "../Layout/Alert";

const SinglePostItem = ({ post: { text, name, user, avatar, date } }) => {
  return (
    <div className="container">
      <Alert />
      <Link to="/posts">Back to Posts</Link>
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
      </div>
    </div>
  );
};

export default SinglePostItem;
