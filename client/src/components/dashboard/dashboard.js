import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DashboardActions } from "./dashboard-actions";
import Experience from "./experience";
import Education from "./education";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile }, theme }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        <Fragment>
            <h1 className={`large ${theme.brandText1}`}>Dashboard</h1>
            <p className="lead mb-2">
                <i className="fas fa-user" /> Welcome {user && user.name}
            </p>
            {profile && user ? (
                <Fragment>
                    <DashboardActions id={user._id} theme={theme} />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />

                    <div className="my-2">
                        <button className={`btn btn-small ${theme.danger}`} onClick={() => deleteAccount()}>
                            <i className="fas fa-user-times" /> Delete Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <p className="mb-2">You have not yet setup a profile, please add some info</p>
                    <Link to="/create-profile" className={`btn my-1 btn-small ${theme.primary}`}>
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    theme: state.theme,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
