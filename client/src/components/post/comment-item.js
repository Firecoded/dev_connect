import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import formatDate from "../../utils/formatDate";
import { deleteComment } from "../../actions/post";

const CommentItem = ({ postId, comment: { _id, text, name, avatar, user, date }, auth, deleteComment, theme }) => (
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
            {!auth.loading && user === auth.user._id && (
                <button onClick={() => deleteComment(postId, _id)} type="button" className={`btn ${theme.danger}`}>
                    <i className="fas fa-times" />
                </button>
            )}
        </div>
    </div>
);

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    theme: state.theme,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
