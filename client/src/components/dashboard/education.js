import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";
import formatDate from "../../utils/formatDate";

const Education = ({ education, deleteEducation, theme }) => {
    const educations = education.map((edu) => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Now"}
            </td>
            <td>
                <Fragment>
                    <button
                        onClick={() => deleteEducation(edu._id)}
                        className={`btn btn-small ${theme.danger} hide-on-small-only`}
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => deleteEducation(edu._id)}
                        className={`btn btn-small ${theme.danger} hide-on-med-and-up`}
                    >
                        <i className="fa fa-times"></i>
                    </button>
                </Fragment>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h4 className={`my-2 mb-3 ${theme.brandText2}`}>Education Credentials</h4>
            <table className={`table mb-5 ${theme.background2}`}>
                <thead className={`${theme.background3}`}>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    theme: state.theme,
});

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { deleteEducation })(Education);
