import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";
import formatDate from "../../utils/formatDate";

const Experience = ({ experience, deleteExperience, theme }) => {
    const experiences = experience.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Now"}
            </td>
            <td>
                <button onClick={() => deleteExperience(exp._id)} className={`btn btn-small ${theme.danger}`}>
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h4 className={`my-2 mb-3 ${theme.brandText2}`}>Experience Credentials</h4>
            <table className={`table mb-3 ${theme.background2}`}>
                <thead className={`${theme.background3}`}>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    theme: state.theme,
});

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { deleteExperience })(Experience);
