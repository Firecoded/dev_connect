import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Register from "../auth/register";
import Login from "../auth/login";
import Alert from "../layout/alert";
import Dashboard from "../dashboard/dashboard";
import ProfileForm from "../profile-forms/profile-form";
import AddExperience from "../profile-forms/add-experience";
import AddEducation from "../profile-forms/add-education";
import Profiles from "../profiles/profiles";
import Profile from "../profile/profile";
import Posts from "../posts/posts";
import Post from "../post/post";
import NotFound from "../layout/not-found";
import PrivateRoute from "../routing/private-route";

const Routes = ({ theme }) => {
    return (
        <section className={`container ${theme.background1} ${theme.textWhite}`}>
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create-profile" component={ProfileForm} />
                <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
                <PrivateRoute exact path="/add-education" component={AddEducation} />
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/posts/:id" component={Post} />
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};

Routes.propTypes = {
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    theme: state.theme,
});

export default connect(mapStateToProps, {})(Routes);
