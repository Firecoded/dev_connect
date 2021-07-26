import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Spinner } from "../layout/spinner";
import ProfileTop from "./profile-top";
import ProfileAbout from "./profile-about";
import ProfileExperience from "./profile-experience";
import ProfileEducation from "./profile-education";
import ProfileGithub from "./profile-github";
import { getProfileById } from "../../actions/profile";

const Profile = ({ getProfileById, profile: { profile }, auth, match, theme }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <Fragment>
            {profile === null ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to="/profiles" className={`my-3 mr-2 btn ${theme.primaryVariant}`}>
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                        <Link to="/edit-profile" className={`my-3 btn ${theme.primaryVariant}`}>
                            Edit Profile
                        </Link>
                    )}
                    <div className="profile-grid my-1 mb-3">
                        <ProfileTop profile={profile} theme={theme} />
                        <ProfileAbout profile={profile} theme={theme} />
                        <div className={`profile-exp px-3 ${theme.background2}`}>
                            <h4 className={`${theme.brandText2}`}>Experience</h4>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map((experience) => (
                                        <ProfileExperience key={experience._id} experience={experience} theme={theme} />
                                    ))}
                                </Fragment>
                            ) : (
                                <h5>No experience credentials</h5>
                            )}
                        </div>

                        <div className={`profile-edu px-3 ${theme.background2}`}>
                            <h4 className={`${theme.brandText2}`}>Education</h4>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                    {profile.education.map((education) => (
                                        <ProfileEducation key={education._id} education={education} theme={theme} />
                                    ))}
                                </Fragment>
                            ) : (
                                <h5>No education credentials</h5>
                            )}
                        </div>

                        {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    theme: state.theme,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
