// resources
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import { NavBar } from "./components/layout/navbar";
import { Landing } from "./components/layout/landing";
import { Login } from "./components/auth/login";
import { Register } from "./components/auth/register";

// css
import "./app.css";

const App = () => {
    return (
        <Router>
            <NavBar />
            <Route exact path="/" component={Landing} />
            <section className="container">
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </section>
        </Router>
    );
};

export default App;
