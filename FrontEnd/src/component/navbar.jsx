import React, { Component } from 'react'
class Navbar extends Component {
    state={}
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Losers</a>
                        <span class="navbar-text">
                        <ul className="navbar-nav form-inline me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/pricing">Pricing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/signup">SignUp</a>
                            </li>
                        </ul>
                        </span>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;