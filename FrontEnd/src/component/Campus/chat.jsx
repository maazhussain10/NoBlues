import { useRef } from 'react'
import React, { Component } from "react";
import CampusNavbar from "./campusNavbar";
import "../../css/chat.css";
import axios from "axios";
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

    componentDidMount = async () => {
        await this.setState({
            username: localStorage.getItem("username"),
            campusId: localStorage.getItem("campusQkey"),
            // friendUsername: this.props.location.state.friendUsername,
        });
        await this.getFriends();
        await this.scrollToBottom();
        setInterval(async () => {
            await this.getChatDetails()
        }, 1000)
    };

    scrollToBottom = () => {
        console.log("SS",this.mesRef.current.scrollTop, this.mesRef.current.scrollHeight, this.mesRef.current.clientHeight);
        this.mesRef.current.scrollTop = 519
        console.log(this.mesRef.current.scrollTop);
	};

    selectedFriend = async (friend) => {
        await this.setState({ friendUsername: friend });
        await this.getChatDetails();
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
        this.scrollToBottom();
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
                console.log(response.data);
                document.getElementById("message").value = "";
                this.getChatDetails();
            });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        console.log(this.state.friends);
        return (
            <div>
                <CampusNavbar />

                <div class="container">
                    {/* <h3 class=" text-center">Messaging</h3> */}
                    <div class="messaging">
                        <div class="inbox_msg">
                            <div class="inbox_people">
                                <div class="headind_srch">
                                    <div class="recent_heading">
                                        <h4>Recent</h4>
                                    </div>
                                    <div class="srch_bar">
                                        <div class="stylish-input-group">
                                            <input
                                                type="text"
                                                class="search-bar"
                                                placeholder="Search"
                                            />
                                            <span class="input-group-addon">
                                                <button type="button">
                                                    {" "}
                                                    <i
                                                        class="fa fa-search"
                                                        aria-hidden="true"
                                                    ></i>{" "}
                                                </button>
                                            </span>{" "}
                                        </div>
                                    </div>
                                </div>
                                <div class="inbox_chat">
                                    {this.state.friends.map((friend, index) => (
                                        <div
                                            class="chat_list active_chat"
                                            onClick={() =>
                                                this.selectedFriend(
                                                    friend.username
                                                )
                                            }
                                        >
                                            <div class="chat_people">
                                                <div class="chat_img">
                                                    {" "}
                                                    <img
                                                        src="https://ptetutorials.com/images/user-profile.png"
                                                        alt="sunil"
                                                    />{" "}
                                                </div>
                                                <div class="chat_ib">
                                                    <h5>
                                                        {friend.username}{" "}
                                                        <span class="chat_date">
                                                            Dec 25
                                                        </span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div class="mesgs"  ref={this.mesRef}>
                                <div class="msg_history"  id="outerbox">
                                    {this.state.friendUsername === "" ? (
                                        <h1>Chat With any User</h1>
                                    ) : (       <>
                                        <h2>{this.state.friendUsername}</h2>
                                            {
                                        this.state.chatDetails.map(
                                            (chatDetail, index) =>
                                         this.state.username ===
                                                    chatDetail.sender ? (
                                                    <div class="outgoing_msg">
                                                        <div class="sent_msg">
                                                            <p>
                                                                {
                                                                    chatDetail.message
                                                                }
                                                            </p>
                                                            <span class="time_date">
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
                                                    <div class="incoming_msg">
                                                        <div class="incoming_msg_img">
                                                            {" "}
                                                            <img
                                                                src="https://ptetutorials.com/images/user-profile.png"
                                                                alt="sunil"
                                                            />{" "}
                                                        </div>
                                                        <div class="received_msg">
                                                            <div class="received_withd_msg">
                                                                <p>
                                                                    {
                                                                        chatDetail.message
                                                                    }
                                                                </p>
                                                                <span class="time_date">
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
                                        )}</>
                                    )}
                                </div>
                                <div class="type_msg">
                                    <div class="input_msg_write">
                                        <input
                                            type="text"
                                            id="message"
                                            class="write_msg"
                                            placeholder=" Type a message"
                                        />
                                        <button
                                            onClick={() => this.sendMessage()}
                                            class="msg_send_btn"
                                            type="button"
                                        >
                                            <i class="far fa-paper-plane" aria-hidden="true"></i>
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

