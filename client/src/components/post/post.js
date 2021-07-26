import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "../layout/spinner";
import PostItem from "../posts/post-item";
import CommentForm from "../post/comment-form";
import CommentItem from "../post/comment-item";
import { getPost } from "../../actions/post";

const Post = ({ getPost, post: { post, loading }, match, theme }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);

    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to="/posts" className={`my-3 btn ${theme.primaryVariant}`}>
                Back To Posts
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} theme={theme} />
            <div className="comments">
                {post.comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
    theme: state.theme,
});

export default connect(mapStateToProps, { getPost })(Post);
