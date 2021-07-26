import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "../layout/spinner";
import ProfileItem from "./profile-item";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading }, theme }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className={`large ${theme.brandText1}`}>Developers</h1>
                    <p className="lead mb-2">
                        <i className="fab fa-connectdevelop" /> Browse and connect with developers
                    </p>
                    <div className={`profiles `}>
                        {profiles.length > 0 ? (
                            profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} theme={theme} />)
                        ) : (
                            <h4>No profiles found...</h4>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    theme: state.theme,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
