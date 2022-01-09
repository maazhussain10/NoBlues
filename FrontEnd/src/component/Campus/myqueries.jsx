import React, { Component } from "react";
import CampusNavbar from "./campusNavbar";
import axios from "axios";
import "../../css/campus.css";
import { Redirect } from "react-router";

class MyQueries extends Component {
    state = {
        myQueries: [],
        username: "",
        campusName: "",
        campusId: "",
        queryArray:[],
        queryId: "",
        query: "",
    };

    componentDidMount = async () => {
        await this.setState({
            username: localStorage.getItem("username"),
            campusName: localStorage.getItem("campusName"),
            campusId: localStorage.getItem("campusQkey"),
        });
        await this.getMyQueries();
    };

    getMyQueries = () => {
        let { username, campusId } = this.state;
        try {
            axios({
                method: "get",
                url: "http://localhost:5000/getMyQueries",
                params: {
                    campusId: campusId,
                    username: username,
                },
            }).then((response) => {
                this.setState({ myQueries: response.data });
            });
        } catch (e) {
            console.log(e);
        }
    };

    deleteQuery = (queryId) => {
        try {
            axios({
                method: "get",
                url: "http://localhost:5000/deleteQuery",
                params: {
                    queryId: queryId,
                },
            }).then((response) => {
                this.getMyQueries();
            });
        } catch (e) {
            console.log(e);
        }
    };

    answerQuery = (myQuery) => {
        this.setState({ queryId: myQuery.queryId, query: myQuery.query,queryArray:myQuery });
    };

    render() {
        if (this.state.queryId) {
            console.log(this.state.query, this.state.queryId);
            return (
                <Redirect
                    to={{
                        pathname: `/${this.state.username}/${this.state.campusName}/answerquery`,
                        state: {
                            queryId: this.state.queryId,
                            query: this.state.query,
                            queryArray:this.state.queryArray,
                            isAdmin: true,
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
                            {this.state.myQueries.map((myQuery, index) => (
                                <div className="myquery  row g-3" key={index} style={{ background: "#F0FFFF" }}>
                                    <div className="col-md-8 ">
                                        {" "}
                                        <span
                                            onClick={() =>
                                                this.answerQuery(myQuery)
                                            }
                                        >
                                            {myQuery.query}{" "}
                                        </span>{" "}
                                    </div>
                                    <div className="col-md-4 ">
                                        <span
                                            className="delete"
                                            onClick={() =>
                                                this.deleteQuery(
                                                    myQuery.queryId
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </span>
                                        <span className="count">
                                            {myQuery.answerCount}
                                        </span>
                                        <span style={{background:"red"}} className="count">
                                            {myQuery.likeCount}
                                        </span>
                                        <span className="date">
                                            {myQuery.date.slice(0, 10)}
                                        </span>
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

export default MyQueries;
