import React, { Component } from 'react';
import { Redirect } from 'react-router';

class CampusNavbar extends Component {
    state = { username: "", campusQkey: "", campusName: "", friends: [], friendUsername: "" }

    componentDidMount = async () => {
        await this.setState({ username: localStorage.getItem('username') })
        await this.setState({ campusQkey: localStorage.getItem('campusQkey') })
        await this.setState({ campusName: localStorage.getItem('campusName') })
    }


    render() {
        let { username, campusName, friendUsername } = this.state
        if (friendUsername) {
            return (

                <Redirect to={{
                    pathname: `/${username}/${campusName}/${friendUsername}`,
                    state: { friendUsername: friendUsername, username: username, campusName: campusName }
                }} />)
        }
        else {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href={`/${this.state.username}/dashboard`}>CampusQ</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href={`/${this.state.username}/${campusName}`}>{campusName}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href={`/${username}/dashboard`}>Dashboard</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href={`/${this.state.username}/campushare`}>CampuShare</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/">Help</a>
                                    </li>
                                </ul>
                                <form className="d-flex">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href={`/${this.state.username}/${campusName}/chat`}>Chat</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href={`/${this.state.username}/profile`}>{username}</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href={`/${this.state.username}/settings`}>Settings</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/">Logout</a>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </nav>

                    {/* <div className="w3-sidebar w3-bar-block w3-light-grey w3-card" style={{ width: "300px" }}>
                        <a href={`/${username}/${campusName}`} className="w3-bar-item w3-button">Post a Query!</a>
                        <a href={`/${username}/${campusName}/clearqueries`} className="w3-bar-item w3-button">Clear some Queries</a>
                        <a href={`/${username}/${campusName}/myqueries`} className="w3-bar-item w3-button">My Queries</a>
                    </div> */}
{/*
                    <div className="w3-sidebar w3-bar-block w3-light-grey w3-card" style={{ width: '15%', right: '0' }}>
                        <p className="friendsTitle">Friends</p>
                        {this.state.friends.map((friend, index) => (
                            <button key={index} className="w3-bar-item w3-button" onClick={() => this.selectedFriend(friend.username)}>{friend.username}</button>
                        ))}

                    </div> */}
                </div>
            );
        }
    }
}

export default CampusNavbar;