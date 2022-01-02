import React, { Component } from "react";

class ChatNavbar extends Component {
    state = {
        username: "",
        campusId: "",
        campusName: "",
        friends: [],
        friendUsername: "",
    };

    componentDidMount = async () => {
        await this.setState({
            username: localStorage.getItem("username"),
            campusName: localStorage.getItem("campusName"),
        });
    };

    render() {
        let { username, campusName } = this.state;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a
                            className="navbar-brand"
                            href={`/${this.state.username}/dashboard`}
                        >
                            CampusQ
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
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        aria-current="page"
                                        href="/"
                                    >
                                        Help
                                    </a>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default ChatNavbar;
