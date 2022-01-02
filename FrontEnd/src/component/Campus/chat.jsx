import React, { Component } from "react";
import "../../css/chat.css";
import axios from "axios";
import ChatNavbar from "./chatNavbar";

class Chat extends Component {
    constructor() {
        super();
        this.mesRef = React.createRef();
    }
    state = {
        username: "",
        campusId: "",
        friendUsername: "",
        message: "",
        chatDetails: [],
        friends: [],
    };

    componentDidMount =async() => {
        await this.setState({
            username: localStorage.getItem("username"),
            campusId: localStorage.getItem("campusQkey")
        });
        try {
            this.setState({
                friendUsername: this.props.location.state.friendUsername
            });
        }
        catch(err) {
            // console.log(err)
        }

        this.getFriends();
        this.scrollToBottom();

        setInterval(() => {
            this.getChatDetails();
        }, 1000);
    };

    scrollToBottom = () => {
        this.mesRef.current.scrollTop =
            this.mesRef.current.scrollHeight - this.mesRef.current.clientHeight;
    };

    selectedFriend = async (friend) => {
        this.setState({ friendUsername: friend });
        this.getChatDetails();
        this.scrollToBottom();
    };

    getFriends = () => {
        let { username, campusId } = this.state;
        try {
            axios({
                method: "get",
                url: "http://localhost:5000/getfriends",
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

    getChatDetails = () => {
        let { username, campusId, friendUsername } = this.state;

        try {
            axios({
                method: "get",
                url: "http://localhost:5000/chatdetails",
                params: {
                    campusId: campusId,
                    username: username,
                    friendUsername: friendUsername,
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
                url: "http://localhost:5000/sendmessage",
                params: {
                    campusId: campusId,
                    username: username,
                    friendUsername: friendUsername,
                    message: message,
                },
            }).then((response) => {
                document.getElementById("message").value = "";
                this.scrollToBottom();
                this.getChatDetails();
            });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <div>
                <ChatNavbar />
                <div className="container">
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="inbox_people">
                                <div className="headind_srch">
                                    <div className="recent_heading">
                                        <h4>Recent</h4>
                                    </div>
                                    <div className="srch_bar">
                                        <div className="stylish-input-group">
                                            <input
                                                type="text"
                                                className="search-bar"
                                                placeholder="Search"
                                            />
                                            <span className="input-group-addon">
                                                <button type="button">
                                                    {" "}
                                                    <i
                                                        className="fa fa-search"
                                                        aria-hidden="true"
                                                    ></i>{" "}
                                                </button>
                                            </span>{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="inbox_chat">
                                    {this.state.friends.map((friend, index) => (
                                        <div
                                            key={index}
                                            className="chat_list active_chat"
                                            onClick={() =>
                                                this.selectedFriend(
                                                    friend.username
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
                                                    <h5>
                                                        {friend.username}{" "}
                                                        <span className="chat_date">
                                                            Dec 25
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mesgs">
                                <div
                                    className="msg_history"
                                    id="outerbox"
                                    ref={this.mesRef}
                                >
                                    {this.state.friendUsername === "" ? (
                                        <h1>Chat With any User</h1>
                                    ) : (
                                        <>
                                            <h2>{this.state.friendUsername}</h2>
                                            {this.state.chatDetails.map(
                                                (chatDetail, index) =>
                                                    this.state.username ===
                                                    chatDetail.sender ? (
                                                        <div key={index} className="outgoing_msg">
                                                            <div className="sent_msg">
                                                                <p>
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
                                                                <div className="received_withd_msg">
                                                                    <p>
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
                                            placeholder=" Type a message"
                                        />
                                        <button
                                            onClick={() => this.sendMessage()}
                                            className="msg_send_btn"
                                            type="button"
                                        >
                                            <i
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
