import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const DashboardActions = (props) => {
    return (
        <div className="dash-buttons">
            {props.id ? (
                <Link to={`/profile/${props.id}`} className="btn btn-light">
                    <i className="fas fa-user-circle text-primary"></i> View Profile
                </Link>
            ) : (
                <Fragment />
            )}
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-cog text-primary"></i> Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> Add Experience
            </Link>
            <Link to="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-primary"></i> Add Education
            </Link>
        </div>
    );
};
