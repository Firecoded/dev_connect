import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, history, theme }) => {
    const [formData, setFormData] = useState({
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });

    const { company, title, location, from, to, current, description } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h3 className={`my-3 mb-3 mt-4 ${theme.brandText2}`}>Add Experience</h3>
            <p className="lead">
                <i className="fas fa-code-branch" /> Add any developer/programming positions that you have had in the
                past
            </p>
            <div>* = required field</div>
            <form
                className={`form ${theme.background1} ${theme.textWhite}`}
                onSubmit={(e) => {
                    e.preventDefault();
                    addExperience(formData, history);
                }}
            >
                <div className="form-group">
                    <input
                        className={`${theme.textWhite}`}
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        className={`${theme.textWhite}`}
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={company}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        className={`${theme.textWhite}`}
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <h5>From Date</h5>
                    <input className={`${theme.textWhite}`} type="date" name="from" value={from} onChange={onChange} />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            className={`${theme.textWhite}`}
                            type="checkbox"
                            name="current"
                            checked={current}
                            value={current}
                            onChange={() => {
                                setFormData({ ...formData, current: !current });
                            }}
                        />{" "}
                        Current Job
                    </p>
                </div>
                <div className="form-group">
                    <h5>To Date</h5>
                    <input
                        className={`${theme.textWhite}`}
                        type="date"
                        name="to"
                        value={to}
                        onChange={onChange}
                        disabled={current}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description}
                        onChange={onChange}
                    />
                </div>
                <input className={`${theme.textWhite}`} type="submit" className={`btn my-1 mr-2 ${theme.primary}`} />
                <Link className={`btn my-1 mr-2 ${theme.primaryVariant}`} to="/dashboard">
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({ theme: state.theme });

export default connect(mapStateToProps, { addExperience })(AddExperience);
