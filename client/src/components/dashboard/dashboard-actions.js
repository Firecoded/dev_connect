import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const DashboardActions = ({ id, theme }) => {
    return (
        <div className="dash-buttons mb-3">
            {id ? (
                <Link to={`/profile/${id}`} className={`btn btn-small my-2 mr-2 ${theme.primaryVariant}`}>
                    <i className="fas fa-user-circle text-primary mr-1"></i> View Profile
                </Link>
            ) : (
                <Fragment />
            )}
            <Link to="/edit-profile" className={`btn btn-small my-2 mr-2  ${theme.primaryVariant}`}>
                <i className="fas fa-user-cog text-primary mr-1"></i> Edit Profile
            </Link>
            <Link to="/add-experience" className={`btn btn-small my-2 mr-2  ${theme.primaryVariant}`}>
                <i className="fab fa-black-tie text-primary mr-1"></i> Add Experience
            </Link>
            <Link to="/add-education" className={`btn btn-small my-2 mr-2  ${theme.primaryVariant}`}>
                <i className="fas fa-graduation-cap text-primary mr-1"></i> Add Education
            </Link>
        </div>
    );
};
