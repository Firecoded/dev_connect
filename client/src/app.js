// resources
import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

// components
import store from "./store";
import { NavBar } from "./components/layout/navbar";
import { Landing } from "./components/layout/landing";
import { Login } from "./components/auth/login";
import Register from "./components/auth/register";
import Alert from "./components/layout/alert";
import { loadUser } from "./actions/auth"
import { setAuthToken } from "./utils/setAuthToken";

// css
import "./app.css";

// if(localStorage.token) {
//     setAuthToken(localStorage.token)
// }


const App = () => {
    useEffect(() => {
        if(localStorage.token) {
            store.dispatch(loadUser())
        }
    }, [])

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
                    </Switch>
                </section>
            </Router>
        </Provider>
    );
};

export default App;
