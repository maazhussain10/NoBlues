import React, { Component } from "react";
import CampusNavbar from "./campusNavbar";
import axios from "axios";
import "../../css/campus.css";
import { Redirect } from "react-router";
// import { Redirect } from 'react-router';
class ClearQueries extends Component {
    state = {
        Queries: [],
        username: "",
        CampusName: "",
        queryId: "",
        Query: "",
    };
    componentDidMount = async () => {
        await this.setState({
            username: localStorage.getItem("username"),
            CampusName: localStorage.getItem("CampusName"),
        });
        this.getQueries();
    };

    getQueries = () => {
        let { username, CampusName } = this.state;

        try {
            axios({
                method: "get",
                url: "http://localhost:5000/getqueries",
                params: {
                    CampusName: CampusName,
                    username: username,
                },
            }).then((response) => {
                this.setState({ Queries: response.data });
            });
        } catch (e) {
            console.log(e);
        }
    };

    answerQuery = (Query) => {
        this.setState({ queryId: Query.queryId, Query: Query.query });
        console.log("jjj", this.state.queryId);
    };
    render() {
        if (this.state.queryId) {
            return (
                <Redirect
                    to={{
                        pathname: `/${this.state.username}/${this.state.CampusName}/answerquery`,
                        state: {
                            queryId: this.state.queryId,
                            Query: this.state.Query,
                            isAdmin: false,
                        },
                    }}
                />
            );
        } else {
            return (
                <div className="Dashboard">
                    <CampusNavbar />

                    <div className="content">
                        <div className="textarea">
                            {this.state.Queries.map((Query, index) => (
                                <div className="query" key={index}>
                                    <span>
                                        <span> {Query.username} </span>
                                        <span className="count">
                                            {Query.answerCount}
                                        </span>

                                        <span className="date">
                                            {Query.date.slice(0, 10)}
                                        </span>
                                    </span>
                                    <div className="question">
                                        {" "}
                                        <span
                                            onClick={() =>
                                                this.answerQuery(Query)
                                            }
                                        >
                                            {Query.query}{" "}
                                        </span>{" "}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ClearQueries;
