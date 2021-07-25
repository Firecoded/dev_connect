import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
    profile: {
        bio,
        skills,
        user: { name },
    },
    theme,
}) => (
    <div className={`profile-about p-4 ${theme.background3}`}>
        {bio && (
            <Fragment>
                <h5 className={`${theme.brandText2}`}>{name.trim().split(" ")[0]}s Bio</h5>
                <p>{bio}</p>
                <div className={`line ${theme.background1}`} />
            </Fragment>
        )}
        <h5 className={`${theme.brandText2}`}>Skill Set</h5>
        <div className="skills">
            {skills.map((skill, index) => (
                <div key={index} className="p-1">
                    <i className="fas fa-check" /> {skill}
                </div>
            ))}
        </div>
    </div>
);

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default ProfileAbout;
