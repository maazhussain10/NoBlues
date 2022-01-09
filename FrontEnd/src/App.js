import React, { Component } from 'react';
import HomePage from "./component/Home/homepage";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./component/Home/signup";
import Login from "./component/Home/login";
import Dashboard from "./component/Dashboard/dashboard";
import Campus from "./component/Campus/campus";
import MyQueries from "./component/Campus/myqueries";
import AnswerQuery from "./component/Campus/answerquery";
import ClearQueries from "./component/Campus/clearqueries";
import CampuShare from "./component/campushare/campushare";
import Chat from "./component/Campus/chat";
import Settings from "./component/Dashboard/settings";
import Profile from "./component/Dashboard/profile";
import Pricing from "./component/Home/pricing";
import RegisterCampus from "./component/Home/registerCampus";

class App extends Component {
    render() {
        return (
            <div id="main" className="maincontent">
                <Router>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/pricing" component={Pricing} />
                        <Route exact path="/registration" component={RegisterCampus} />
                        <Route
                            exact
                            path="/:username/dashboard"
                            component={Dashboard}
                        />
                        <Route
                            exact
                            path="/:username/campushare"
                            component={CampuShare}
                        />
                        <Route exact path="/:username/settings" component={Settings} />
                        <Route exact path="/:username/profile" component={Profile} />
                        <Route exact path="/:username/:campusname" component={Campus} />
                        <Route
                            exact
                            path="/:username/:campusname/myqueries"
                            component={MyQueries}
                        />
                        <Route
                            exact
                            path="/:username/:campusname/answerquery"
                            component={AnswerQuery}
                        />
                        <Route
                            exact
                            path="/:username/:campusname/clearqueries"
                            component={ClearQueries}
                        />
                        <Route
                            exact
                            path="/:username/:campusname/chat"
                            component={Chat}
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
