import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
    profile: {
        status,
        company,
        location,
        website,
        social,
        user: { name, avatar },
    },
    theme,
}) => {
    return (
        <div className={`profile-top p-5 ${theme.background2}`}>
            <img className="round-img my-1" src={avatar} alt="" />
            <h1 className="large mt-3">{name}</h1>
            <p className="lead">
                {status} {company ? <span> at {company}</span> : null}
            </p>
            <p>{location ? <span>{location}</span> : null}</p>
            <div className="icons my-2">
                {website ? (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        <i className={`fas fa-globe fa-2x ${theme.brandText1}`} />
                    </a>
                ) : null}
                {social
                    ? Object.entries(social)
                          .filter(([_, value]) => value)
                          .map(([key, value]) => (
                              <a key={key} href={value} target="_blank" rel="noopener noreferrer" className="pl-2">
                                  <i className={`fab fa-${key} fa-2x`}></i>
                              </a>
                          ))
                    : null}
            </div>
        </div>
    );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default ProfileTop;
