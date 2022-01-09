import React, { Component } from "react";
import Logo from "../../images/Logo.png";

class Navbar extends Component {
    state = {};
    render() {
        return (
            <div>
                <nav
                    className="navbar navbar-expand-lg navbar-light bg-light"
                    style={{ borderBottom: "1px solid grey" }}
                >
                    <div className="container-fluid">
                        <a href="/" style={{ textDecoration: "none" }} class="navbar-brand">
                            <img
                                src={Logo}
                                alt="NoBlues"
                                height="40px"
                                width="40px"
                            />{" "}
                            <a
                                className="navbar-brand"
                                href="/"
                                style={{
                                    marginLeft: "10px",
                                    fontSize: "20px",
                                    color: "#000000",
                                    fontWeight: "bolder",
                                }}
                            >
                                NoBlues
                            </a>
                        </a>
                        <span class="navbar-text">
                            <ul className="navbar-nav form-inline me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        aria-current="page"
                                        href="/login"
                                    >
                                        Login
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        aria-current="page"
                                        href="/signup"
                                    >
                                        SignUp
                                    </a>
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
