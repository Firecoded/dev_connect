import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { connect } from "react-redux";
import { addLike, deletePost } from "../../actions/post";

const PostItem = ({
    addLike,
    deletePost,
    auth,
    post: { _id, text, name, avatar, user, likes, comments, date },
    showActions,
    theme,
}) => (
    <div className="post bg-white p-1 my-1">
        <div className="mb-2">
            <Link to={`/profile/${user}`}>
                <img className="round-img mt-2" src={avatar} alt="" />
                <h5 className="mt-2">{name}</h5>
            </Link>
        </div>
        <div>
            <p className="my-1 mb-4">{text}</p>
            <p className="post-date mb-2">Posted on {formatDate(date)}</p>

            {showActions && (
                <Fragment>
                    <button onClick={() => addLike(_id)} type="button" className={`btn ${theme.primary} mr-2`}>
                        <i className="fas fa-thumbs-up" />{" "}
                        <span className={theme.brandText2}>{likes.length > 0 && <span>{likes.length}</span>}</span>
                    </button>
                    <Link to={`/posts/${_id}`} className={`btn ${theme.primaryVariant} mr-2`}>
                        Discussion{" "}
                        {comments.length > 0 && <span className={`ml-1 ${theme.brandText2}`}>{comments.length}</span>}
                    </Link>
                    {!auth.loading && user === auth.user._id && (
                        <button onClick={() => deletePost(_id)} type="button" className={`btn ${theme.danger}`}>
                            <i className="fas fa-times" />
                        </button>
                    )}
                </Fragment>
            )}
        </div>
    </div>
);

PostItem.defaultProps = {
    showActions: true,
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    showActions: PropTypes.bool,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    theme: state.theme,
});

export default connect(mapStateToProps, { addLike, deletePost })(PostItem);
