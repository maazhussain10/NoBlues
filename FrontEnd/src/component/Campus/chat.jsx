import React, { Component } from "react";
import "../../css/chat.css";
import axios from "axios";
import CampusNavbar from "./campusNavbar";

class Chat extends Component {
    constructor() {
        super();
        this.mesRef = React.createRef();
    }
    state = {
        username: "",
        campusId: "",
        friendUsername: "",
        friendUserId: "",
        message: "",
        chatDetails: [],
        friends: [],
        depressedPortal: false,
    };

    componentDidMount = async () => {
        await this.setState({
            username: localStorage.getItem("username"),
            campusId: localStorage.getItem("campusQkey"),
        });
        try {
            this.setState({
                friendUsername: this.props.location.state.friendUsername,
            });
        } catch (err) {
            console.log(err);
        }

        this.getFriends();
        this.scrollToBottom();

        setInterval(() => {
            this.getChatDetails(this.state.depressedPortal);
        }, 1000);
    };

    scrollToBottom = () => {
        this.mesRef.current.scrollTop =
            this.mesRef.current.scrollHeight - this.mesRef.current.clientHeight;
    };

    selectedFriend = async (friend, friendUserId) => {
        this.setState({ friendUsername: friend, friendUserId: friendUserId });
        this.getChatDetails(this.state.depressedPortal);
        this.scrollToBottom();
    };

    getFriends = () => {
        let { username, campusId } = this.state;
        try {
            axios({
                method: "get",
                url: "https://noblues.azurewebsites.net/getfriends",
                params: {
                    campusId: campusId,
                    username: username,
                },
            }).then((response) => {
                this.setState({ friends: response.data });
            });
        } catch (e) {
            console.log(e);
        }
    };

    getChatDetails = (depressedPortal) => {
        let { username, campusId, friendUsername } = this.state;
        this.setState({
            depressedPortal: localStorage.getItem("depressedPortal"),
        });
        try {
            axios({
                method: "get",
                url: "https://noblues.azurewebsites.net/chatdetails",
                params: {
                    campusId: campusId,
                    username: username,
                    friendUsername: friendUsername,
                    depressedPortal: depressedPortal,
                },
            }).then((response) => {
                this.setState({ chatDetails: response.data });
            });
        } catch (e) {
            console.log(e);
        }
    };

    sendMessage = () => {
        let { username, campusId, friendUsername } = this.state;
        let message = document.getElementById("message").value;
        try {
            axios({
                method: "get",
                url: "https://noblues.azurewebsites.net/sendmessage",
                params: {
                    campusId: campusId,
                    username: username,
                    friendUsername: friendUsername,
                    message: message,
                    depressedPortal: this.state.depressedPortal,
                },
            }).then((response) => {
                document.getElementById("message").value = "";
                this.scrollToBottom();
                this.getChatDetails(this.state.depressedPortal);
            });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        let { depressedPortal } = this.state;
        let theme, sidebarTheme, chatWindowTheme;
        if (depressedPortal === "true") {
            theme = "white";
            sidebarTheme = "#171717";
            chatWindowTheme = "#0F0F0F";
        } else {
            theme = "black";
            sidebarTheme = "white";
            chatWindowTheme = "#F0FFFF";
        }
        console.log(sidebarTheme);
        return (
            <div>
                <CampusNavbar getChatDetails={this.getChatDetails} />
                <div className="container">
                    <div className="messaging">
                        <div
                            className="inbox_msg"
                            style={{ background: sidebarTheme }}
                        >
                            <div
                                className="inbox_people"
                                style={{ background: sidebarTheme }}
                            >
                                <div
                                    className="headind_srch"
                                    style={{ background: sidebarTheme }}
                                >
                                    <div className="recent_heading">
                                        <h4
                                            style={{
                                                fontWeight: "bold",
                                                color: "#a674b8",
                                            }}
                                        >
                                            My Friends
                                        </h4>
                                    </div>
                                    <div className="srch_bar">
                                        <div className="stylish-input-group">
                                            <span className="input-group-addon">
                                                <button type="button"></button>
                                            </span>{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="inbox_chat">
                                    {this.state.friends.map((friend, index) => (
                                        <div
                                            key={index}
                                            className="chat_list active_chat"
                                            style={{
                                                backgroundColor: sidebarTheme,
                                            }}
                                            onClick={() =>
                                                this.selectedFriend(
                                                    friend.username,
                                                    friend.userId
                                                )
                                            }
                                        >
                                            <div className="chat_people">
                                                <div className="chat_img">
                                                    {" "}
                                                    <img
                                                        src="https://ptetutorials.com/images/user-profile.png"
                                                        alt="sunil"
                                                    />{" "}
                                                </div>
                                                <div className="chat_ib">
                                                    {this.state
                                                        .depressedPortal ===
                                                    "true" ? (
                                                        <h5
                                                            style={{
                                                                color: theme,
                                                            }}
                                                        >
                                                            {friend.userId.slice(
                                                                0,
                                                                8
                                                            )}{" "}
                                                            <span className="chat_date">
                                                                Dec 25
                                                            </span>
                                                        </h5>
                                                    ) : (
                                                        <h5
                                                            style={{
                                                                color: theme,
                                                            }}
                                                        >
                                                            {friend.username}{" "}
                                                            <span className="chat_date">
                                                                Dec 25
                                                            </span>
                                                        </h5>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div
                                className="mesgs"
                                style={{ background: chatWindowTheme }}
                            >
                                <div
                                    className="msg_history"
                                    id="outerbox"
                                    ref={this.mesRef}
                                >
                                    {this.state.friendUsername === "" ? (
                                        <h1 style={{ color: theme }}>
                                            Chat With any User
                                        </h1>
                                    ) : (
                                        <>
                                            {this.state.depressedPortal ===
                                            "true" ? (
                                                <h2
                                                    style={{
                                                        fontWeight: "bold",
                                                        color: "#a674b8",
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    {this.state.friendUserId.slice(
                                                        0,
                                                        8
                                                    )}
                                                </h2>
                                            ) : (
                                                <h2
                                                    style={{
                                                        fontWeight: "bold",
                                                        color: "#a674b8",
                                                        marginBottom: "20px",
                                                    }}
                                                >
                                                    {this.state.friendUsername}
                                                </h2>
                                            )}
                                            {this.state.chatDetails.map(
                                                (chatDetail, index) =>
                                                    this.state.username ===
                                                    chatDetail.sender ? (
                                                        <div
                                                            key={index}
                                                            className="outgoing_msg"
                                                        >
                                                            <div
                                                                className="sent_msg"
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    marginBottom:
                                                                        "5px",
                                                                }}
                                                            >
                                                                <p
                                                                    style={{
                                                                        background:
                                                                            "#5a3269",
                                                                        color: chatWindowTheme,
                                                                    }}
                                                                >
                                                                    {
                                                                        chatDetail.message
                                                                    }
                                                                </p>
                                                                <span className="time_date">
                                                                    {" "}
                                                                    {chatDetail.dateCreated.slice(
                                                                        0,
                                                                        10
                                                                    )}{" "}
                                                                    |{" "}
                                                                    {chatDetail.dateCreated.slice(
                                                                        11,
                                                                        16
                                                                    )}
                                                                </span>{" "}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="incoming_msg">
                                                            <div className="incoming_msg_img">
                                                                {" "}
                                                                <img
                                                                    src="https://ptetutorials.com/images/user-profile.png"
                                                                    alt="sunil"
                                                                />{" "}
                                                            </div>
                                                            <div className="received_msg">
                                                                <div
                                                                    className="received_withd_msg"
                                                                    style={{
                                                                        fontWeight:
                                                                            "bold",
                                                                        marginBottom:
                                                                            "5px",
                                                                    }}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            background:
                                                                                "#c9a5d6",
                                                                            color: theme,
                                                                        }}
                                                                    >
                                                                        {
                                                                            chatDetail.message
                                                                        }
                                                                    </p>
                                                                    <span className="time_date">
                                                                        {" "}
                                                                        {chatDetail.dateCreated.slice(
                                                                            0,
                                                                            10
                                                                        )}{" "}
                                                                        |{" "}
                                                                        {chatDetail.dateCreated.slice(
                                                                            11,
                                                                            16
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <input
                                            type="text"
                                            id="message"
                                            className="write_msg"
                                            style={{ color: theme }}
                                            placeholder=" Type a message"
                                        />
                                        <button
                                            onClick={() => this.sendMessage()}
                                            className="msg_send_btn"
                                            style={{ background: "#39004f" }}
                                            type="button"
                                        >
                                            <i
                                                style={{ color: "#FFFFFF" }}
                                                className="far fa-paper-plane"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
