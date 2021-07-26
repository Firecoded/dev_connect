import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./post-item";
import PostForm from "./post-form";
import { getPosts } from "../../actions/post";

const Posts = ({ getPosts, post: { posts }, theme }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <Fragment>
            <h3 className={`my-3 mb-3 mt-4 ${theme.brandText2}`}>Posts</h3>
            <p className="lead">
                <i className="fas fa-user" /> Welcome to the community
            </p>
            <PostForm theme={theme} />
            <div className={`posts ${theme.themeName}`}>
                {posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
    theme: state.theme,
});

export default connect(mapStateToProps, { getPosts })(Posts);
