import React, { Component } from 'react'
class DashboardNavbar extends Component {
    state = { username: "" }
    componentDidMount = () => {
        this.setState({ username: localStorage.getItem('username') })
    }
    render() {
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
                                    <a className="nav-link active" aria-current="page" href={`/${this.state.username}/campushare`}>CampuShare</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Help</a>

                                </li>



                            </ul>
                            <form className="d-flex">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href={`/${this.state.username}/profile`}>{this.state.username}</a>
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


            </div>
        );
    }
}

export default DashboardNavbar;