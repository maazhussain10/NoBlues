import React, { Component } from "react";
import CampusNavbar from "./campusNavbar";
import axios from "axios";
import "../../css/campus.css";
import { Redirect } from "react-router";

class ClearQueries extends Component {
    state = {
        queries: [],
        queryArray: [],
        username: "",
        campusName: "",
        queryId: "",
        query: "",
    };

    componentDidMount = async () => {
        await this.setState({
            username: localStorage.getItem("username"),
            campusName: localStorage.getItem("campusName"),
            campusId: localStorage.getItem("campusQkey"),
        });
        this.getQueries();
    };

    getQueries = () => {
        let { username, campusId } = this.state;
        try {
            axios({
                method: "get",
                url: "https://noblues.azurewebsites.net/getQueries",
                params: {
                    username: username,
                    campusId: campusId,
                },
            }).then((response) => {
                this.setState({ queries: response.data });
            });
        } catch (e) {
            console.log(e);
        }
    };

    answerQuery = (query) => {
        this.setState({
            queryId: query.queryId,
            query: query.query,
            queryArray: query,
        });
    };

    render() {
        if (this.state.queryId) {
            return (
                <Redirect
                    to={{
                        pathname: `/${this.state.username}/${this.state.campusName}/answerquery`,
                        state: {
                            queryId: this.state.queryId,
                            query: this.state.query,
                            queryArray: this.state.queryArray,
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
                            {this.state.queries.map((query, index) => (
                                <div
                                    className="query"
                                    key={index}
                                    style={{ background: "#F0FFFF" }}
                                >
                                    <span>
                                        <span> {query.username} </span>
                                        <span className="count">
                                            {query.answerCount}
                                        </span>
                                        <span
                                            style={{ background: "red" }}
                                            className="count"
                                        >
                                            {query.likeCount}
                                        </span>
                                        <span className="date">
                                            {query.date.slice(0, 10)}
                                        </span>
                                    </span>
                                    <div className="question">
                                        {" "}
                                        <span
                                            onClick={() =>
                                                this.answerQuery(query)
                                            }
                                        >
                                            {query.query}{" "}
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
