import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Logo from "../../images/Logo.png";

class CampusNavbar extends Component {
    state = {
        username: "",
        campusId: "",
        campusName: "",
        friends: [],
        friendUsername: "",
        depressedPortal: false,
        isChatPage: false,
    };

    componentDidMount = async () => {
        await this.setState({
            username: localStorage.getItem("username"),
            campusId: localStorage.getItem("campusQkey"),
            campusName: localStorage.getItem("campusName"),
            depressedPortal: localStorage.getItem("depressedPortal"),
        });

        let url = window.location.pathname.split("/");
        if (
            url[url.length - 1] === "chat" ||
            url[url.length - 1] === "campushare"
        )
            await this.setState({ isChatPage: true });
        await this.getFriends();
    };

    handleLogout = () => {
        localStorage.removeItem("campusName");
        localStorage.removeItem("campusQkey");
        localStorage.removeItem("username");
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

    depressedPortal = (status) => {
        localStorage.setItem("depressedPortal", status);
        this.setState({
            depressedPortal: localStorage.getItem("depressedPortal"),
        });
        if (this.state.isChatPage)
            this.props.getChatDetails(this.depressedPortal);
    };

    selectedFriend = (friend) => {
        this.setState({ friendUsername: friend });
    };

    render() {
        let { username, campusName, friendUsername, depressedPortal } =
            this.state;
        let theme, sidebarTheme, textColor;
        if (depressedPortal === "true") {
            document.getElementById("main").className = "maincontent-dark";
            theme = "#0F0F0F";
            textColor = "#FFFFFF";
            sidebarTheme = "#171717";
        } else {
            if (document.getElementById("main"))
                document.getElementById("main").className = "maincontent";
            theme = "#FFFFFF";
            textColor = "#000000";
            sidebarTheme = "#f5f5f5";
        }

        if (friendUsername) {
            return (
                <Redirect
                    to={{
                        pathname: `/${username}/${campusName}/chat`,
                        state: {
                            friendUsername: friendUsername,
                            username: username,
                            campusName: campusName,
                        },
                    }}
                />
            );
        } else {
            return (
                <div>
                    <nav
                        className={"navbar navbar-expand-lg navbar-"}
                        style={{
                            borderBottom: "1px solid grey",
                            background: theme,
                        }}
                    >
                        <div className="container-fluid">
                            <img
                                src={Logo}
                                alt="NoBlues"
                                height="40px"
                                width="40px"
                            />{" "}
                            <a
                                className="navbar-brand"
                                href={`/${this.state.username}/dashboard`}
                                style={{
                                    marginLeft: "10px",
                                    fontSize: "20px",
                                    color: { theme },
                                    textDecoration: "none",
                                    fontWeight: "bolder",
                                }}
                            >
                                NoBlues
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div
                                className="collapse navbar-collapse"
                                id="navbarSupportedContent"
                            >
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            aria-current="page"
                                            href={`/${this.state.username}/${campusName}`}
                                        >
                                            {campusName}
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            aria-current="page"
                                            href={`/${username}/dashboard`}
                                        >
                                            Dashboard
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            aria-current="page"
                                            href={`/${this.state.username}/campushare`}
                                        >
                                            CampuShare
                                        </a>
                                    </li>
                                </ul>
                                <form className="d-flex">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        {depressedPortal === "true" ? (
                                            <li
                                                className="nav-item"
                                                onClick={() =>
                                                    this.depressedPortal(
                                                        "false"
                                                    )
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                <img
                                                    alt="aaa"
                                                    src="https://img.icons8.com/external-inipagistudio-lineal-color-inipagistudio/35/000000/external-mask-theatre-inipagistudio-lineal-color-inipagistudio.png"
                                                />{" "}
                                            </li>
                                        ) : (
                                            <li
                                                className="nav-item"
                                                onClick={() =>
                                                    this.depressedPortal("true")
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                <img
                                                    alt="aaa"
                                                    src="https://img.icons8.com/external-inipagistudio-lineal-color-inipagistudio/35/000000/external-mask-theatre-inipagistudio-lineal-color-inipagistudio.png"
                                                />{" "}
                                            </li>
                                        )}
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                aria-current="page"
                                                href={`/${this.state.username}/${campusName}/chat`}
                                            >
                                                Chat
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                aria-current="page"
                                                href={`/${this.state.username}/profile`}
                                            >
                                                {username}
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                aria-current="page"
                                                href={`/${this.state.username}/settings`}
                                            >
                                                Settings
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                aria-current="page"
                                                href="/"
                                                onClick={() => this.handleLogout()}
                                            >
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </nav>

                    {this.state.isChatPage === false ? (
                        <>
                            <div
                                className={
                                    "w3-sidebar w3-bar-block w3- w3-card"
                                }
                                style={{
                                    width: "300px",
                                    background: sidebarTheme,
                                }}
                            >
                                <a
                                    href={`/${username}/${campusName}`}
                                    className="w3-bar-item w3-button"
                                >
                                    Post a Query!
                                </a>
                                <a
                                    href={`/${username}/${campusName}/clearqueries`}
                                    className="w3-bar-item w3-button"
                                >
                                    Clear some Queries
                                </a>
                                <a
                                    href={`/${username}/${campusName}/myqueries`}
                                    className="w3-bar-item w3-button"
                                >
                                    My Queries
                                </a>
                            </div>

                            <div
                                className={
                                    "w3-sidebar w3-bar-block w3- w3-card"
                                }
                                style={{
                                    width: "15%",
                                    right: "0",
                                    background: sidebarTheme,
                                }}
                            >
                                <p
                                    className="friendsTitle"
                                    style={{ color: textColor }}
                                >
                                    Friends
                                </p>
                                {this.state.friends.map((friend, index) => (
                                    <button
                                        key={index}
                                        className="w3-bar-item w3-button"
                                        onClick={() =>
                                            this.selectedFriend(friend.username)
                                        }
                                    >
                                        {friend.username}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>
            );
        }
    }
}

export default CampusNavbar;
