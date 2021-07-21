import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const DashboardActions = (props) => {
    const buildViewProfile = () => {
        if (props.profile && props.profile.user?._id) {
            return (
                <Link to={`/profile/${props.profile.user._id}`} className="btn btn-light">
                    <i className="fas fa-user-circle text-primary"></i> View Profile
                </Link>
            );
        }
        return <Fragment />;
    };
    return (
        <div className="dash-buttons">
            {buildViewProfile()}
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
