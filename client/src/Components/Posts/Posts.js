import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/Actions/post";
import Spinner from "../Layout/Spinner";
import PostItem from "./PostItem";
import Alert from "../Layout/Alert";
import PostForm from "./PostForm";

const Posts = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div className="container">
      <Alert />
      {post.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community
          </p>
          <PostForm />
          <div className="posts">
            {post.posts.map((post) => {
              return <PostItem key={post._id} post={post} />;
            })}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Posts;
