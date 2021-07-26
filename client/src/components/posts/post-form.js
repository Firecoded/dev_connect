import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost, theme }) => {
    const [text, setText] = useState("");

    return (
        <div className="post-form">
            <div className={``}>
                <h5 className={`${theme.background2} mb-4 py-2 pl-2`}>Share a post or start a discussion...</h5>
            </div>
            <form
                className="form my-1"
                onSubmit={(e) => {
                    e.preventDefault();
                    addPost({ text });
                    setText("");
                }}
            >
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    className={`${theme.textWhite}`}
                />
                <input type="submit" className={`btn my-4 mr-2 ${theme.primary} ${theme.textWhite}`} />
            </form>
        </div>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
