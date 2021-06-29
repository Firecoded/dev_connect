// resources
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// components
import store from "./store";
import { NavBar } from "./components/layout/navbar";
import { Landing } from "./components/layout/landing";
import { Login } from "./components/auth/login";
import Register from "./components/auth/register";
import Alert from "./components/layout/alert";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./components/hoc/private_route";
import { CreateProfile } from "./components/profile_forms/create_profile";

// util/actions
import { loadUser } from "./actions/auth";
import { setAuthToken } from "./utils/setAuthToken";

// css
import "./app.css";

// if(localStorage.token) {
//     setAuthToken(localStorage.token)
// }

//TODO: add load state

const App = () => {
    useEffect(() => {
        if (localStorage.token) {
            store.dispatch(loadUser());
        }
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <NavBar />
                <Route exact path="/" component={Landing} />
                <section className="container">
                    <Alert />
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                    </Switch>
                </section>
            </Router>
        </Provider>
    );
};

export default App;
