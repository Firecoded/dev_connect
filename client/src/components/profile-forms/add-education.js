import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation, history, theme }) => {
    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });

    const { school, degree, fieldofstudy, from, to, description, current } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h3 className={`my-3 mb-3 mt-4 ${theme.brandText2}`}>Add Your Education</h3>
            <p className="lead">
                <i className="fas fa-code-branch" /> Add any school or bootcamp that you have attended
            </p>
            <div>* = required field</div>
            <form
                className={`form ${theme.background1} ${theme.textWhite}`}
                onSubmit={(e) => {
                    e.preventDefault();
                    addEducation(formData, history);
                }}
            >
                <div className="form-group">
                    <input
                        className={`${theme.textWhite}`}
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        className={`${theme.textWhite}`}
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        className={`${theme.textWhite}`}
                        type="text"
                        placeholder="Field of Study"
                        name="fieldofstudy"
                        value={fieldofstudy}
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
                            onChange={() => setFormData({ ...formData, current: !current })}
                        />{" "}
                        Current School
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
                        placeholder="Program Description"
                        value={description}
                        onChange={onChange}
                        className={`${theme.textWhite}`}
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ theme: state.theme });

export default connect(mapStateToProps, { addEducation })(AddEducation);
