import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
    profile: {
        user: { _id, name, avatar },
        status,
        company,
        location,
        skills,
    },
    theme,
}) => {
    return (
        <div className={`profile z-depth-3 ${theme.background2}`}>
            <img src={avatar} alt="" className="round-img" />
            <div>
                <h2>{name}</h2>
                <p>
                    {status} {company && <span> at {company}</span>}
                </p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className={`btn my-1 btn-small ${theme.primary}`}>
                    View Profile
                </Link>
            </div>
            <ul>
                {skills.slice(0, 4).map((skill, index) => (
                    <li key={index} className="">
                        <i className="fas fa-check" /> {skill}
                    </li>
                ))}
            </ul>
        </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;
