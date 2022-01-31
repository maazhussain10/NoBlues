import React, { Component } from "react";
import CampusNavbar from "./campusNavbar";
import axios from "axios";
import "../../css/campus.css";

class AnswerQuery extends Component {
    state = {
        query: "",
        answers: [],
        campusName: "",
        queryArray: [],
        queryId: "",
        username: "",
        isAdmin: false,
        campusId: "",
    };

    componentDidMount = async () => {
        await this.setState({
            username: localStorage.getItem("username"),
            campusName: localStorage.getItem("campusName"),
            campusId: localStorage.getItem("campusQkey"),
            queryId: this.props.location.state.queryId,
            query: this.props.location.state.query,
            isAdmin: this.props.location.state.isAdmin,
            queryArray: this.props.location.state.queryArray,
        });
        this.getQueryAnswers();
    };

    getQueryAnswers = () => {
        let { queryId, username } = this.state;
        try {
            axios({
                method: "get",
                url: "https://noblues.azurewebsites.net/getQueryAnswers",
                params: {
                    username: username,
                    queryId: queryId,
                },
            }).then((response) => {
                this.setState({ answers: response.data });
            });
        } catch (e) {
            console.log(e);
        }
    };

    reply = () => {
        let reply = document.getElementById("replybox").value;
        let { username, campusId, queryId } = this.state;
        try {
            axios({
                method: "get",
                url: "https://noblues.azurewebsites.net/postAnswer",
                params: {
                    campusId: campusId,
                    username: username,
                    reply: reply,
                    queryId: queryId,
                },
            }).then((response) => {
                document.getElementById("replybox").value = "";
                this.getQueryAnswers();
            });
        } catch (e) {
            console.log(e);
        }
    };

    deleteQuery = (queryId) => {
        try {
            axios({
                method: "get",
                url: "https://noblues.azurewebsites.net/deleteQuery",
                params: {
                    queryId: queryId,
                },
            }).then((response) => {});
        } catch (e) {
            console.log(e);
        }
    };

    deleteAnswer = (answerId) => {
        try {
            axios({
                method: "get",
                url: "https://noblues.azurewebsites.net/deleteAnswer",
                params: {
                    answerId: answerId,
                },
            }).then((response) => {
                this.getQueryAnswers();
            });
        } catch (e) {
            console.log(e);
        }
    };

    like = (type, id) => {
        let { username, campusId } = this.state;
        try {
            axios({
                method: "get",
                url: "https://noblues.azurewebsites.net/likeCount",
                params: {
                    username: username,
                    campusId: campusId,
                    type: type,
                    id: id,
                },
            }).then((response) => {
                this.getQueryAnswers();
            });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        let { isAdmin, query, queryId, queryArray, answers } = this.state;
        return (
            <div className="Dashboard">
                <CampusNavbar />
                <div className="content">
                    <div className="textarea">
                        <div
                            className="myquery"
                            style={{ background: "#F0FFFF" }}
                        >
                            <span>{query}</span>
                            <span
                                className="like"
                                onClick={() => this.like("query", queryId)}
                                style={{ color: "black" }}
                            >
                                {queryArray.likeCount}{" "}
                                {queryArray.userLikeStatus ? (
                                    <i
                                        style={{ color: "red" }}
                                        className="fas fa-heart"
                                    ></i>
                                ) : (
                                    <i
                                        style={{ color: "gray" }}
                                        className="fas fa-heart"
                                    ></i>
                                )}
                            </span>
                            {isAdmin ? (
                                <span
                                    className="delete"
                                    style={{ color: "#000000" }}
                                    onClick={() => this.deleteQuery(queryId)}
                                >
                                    <i className="fas fa-trash"></i>
                                </span>
                            ) : null}
                        </div>
                        <textarea
                            rows="3"
                            className="form-control h-15 answerinput"
                            placeholder="Clear the query"
                            id="replybox"
                        ></textarea>
                        <button
                            className="post1"
                            type="button"
                            style={{
                                background: "#be9fc9",
                                padding: "5px",
                                fontSize: "18px",
                                fontWeight: "600",
                            }}
                            onClick={() => this.reply()}
                        >
                            Reply
                        </button>

                        {answers.map((answer, index) => (
                            <div
                                className="replies"
                                key={index}
                                style={{ background: "#F0F0FF" }}
                            >
                                {isAdmin ||
                                answer.username === this.state.username ? (
                                    <span
                                        className="deleteanswer"
                                        style={{ color: "#000000" }}
                                        onClick={() =>
                                            this.deleteAnswer(answer.answerId)
                                        }
                                    >
                                        <i className="fas fa-trash"></i>
                                    </span>
                                ) : null}
                                <span
                                    className="like"
                                    onClick={() =>
                                        this.like("answer", answer.answerId)
                                    }
                                    style={{ color: "#b80505" }}
                                >
                                    {answer.likeCount}{" "}
                                    {answer.userLikeStatus ? (
                                        <i
                                            style={{ color: "#b80505" }}
                                            className="fas fa-star"
                                        ></i>
                                    ) : (
                                        <i
                                            style={{ color: "grey" }}
                                            className="fas fa-star"
                                        ></i>
                                    )}
                                </span>
                                <div className="answerbox">
                                    <div className="answerfield">
                                        <span>{answer.username}</span>
                                        <span className="date">
                                            {answer.dateCreated.slice(0, 10)}
                                        </span>
                                    </div>
                                    <div className="answer">
                                        {answer.answers}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default AnswerQuery;
