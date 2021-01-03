import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../Redux/Actions/post";
import Spinner from "../Layout/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import SinglePostItem from "./SinglePostItem";

const Post = (props) => {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  return post.loading || post.post == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <SinglePostItem post={post.post} />
      <CommentForm postID={post.post._id} />
      <div className="comments">
        {post.post.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postID={post.post._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Post;
