import React from "react";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatDate";

const ProfileEducation = ({ education: { school, degree, fieldofstudy, current, to, from, description }, theme }) => (
    <div>
        <h5 className="text-dark">{school}</h5>
        <p>
            {formatDate(from)} - {to ? formatDate(to) : "Now"}
        </p>
        <p>
            <strong>Degree: </strong> {degree}
        </p>
        <p>
            <strong>Field Of Study: </strong> {fieldofstudy}
        </p>
        <p>
            <strong>Description: </strong> {description}
        </p>
    </div>
);

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default ProfileEducation;
