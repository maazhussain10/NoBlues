import React, { Component } from "react";
import "../../css/homepage.css";
import axios from "axios";
import { Redirect } from "react-router";
import Navbar from "./navbar";

class Login extends Component {
    state = { loginauth: false, username: "", load: false };

    Login = () => {
        this.setState({ load: true });
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        try {
            axios({
                method: "post",
                url: "https://noblues.azurewebsites.net/login",
                params: {
                    email: email,
                    password: password,
                },
            }).then((response) => {
                if (response.data) {
                    this.setState({
                        loginauth: true,
                        username: response.data[0].username,
                        load:false
                    });
                } else {
                    this.setState({
                        load:false
                    });
                    alert("Invalid Email or Password");

                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    redirectToDashboard = (username) => {
        return <Redirect to={`/${username}/dashboard`} />;
    };

    render() {
        if (this.state.loginauth) {
            localStorage.setItem("username", this.state.username);
            return <Redirect to={`/${this.state.username}/dashboard`} />;
        } else {
            return (
                <div className="divn">
                    <Navbar />
                    <div className="container-fluid">
                        <div className="container p-4">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-lg-8 col-md-12">
                                    <div className="card h-100  w-100 shadow-lg">
                                        <form className="form">
                                            <h1 className="loginfont">Login</h1>
                                            <div className="input-group mb-4 flex-nowrap">
                                                <span
                                                    className="input-group-text"
                                                    id="addon-wrapping"
                                                >
                                                    <i className="fas fa-at"></i>
                                                </span>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    className="form-control form-control-lg"
                                                    placeholder="Email"
                                                    aria-label="Email"
                                                    aria-describedby="addon-wrapping"
                                                />
                                            </div>
                                            <div className="input-group mb-4 flex-nowrap">
                                                <span
                                                    className="input-group-text"
                                                    id="addon-wrapping"
                                                >
                                                    <i className="fas fa-unlock-alt"></i>
                                                </span>
                                                <input
                                                    id="password"
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    placeholder="Password"
                                                    aria-label="Password"
                                                    aria-describedby="addon-wrapping"
                                                />
                                            </div>
                                            <button
                                                className="btn btn-outline-dark btn-lg loginbtn"
                                                type="button"
                                                onClick={() => this.Login()}
                                            >
                                                Login
                                            </button>
                                            {this.state.load ? (
                                                <div className="row d-flex justify-content-center align-items-center h-100">
                                                <div
                                                    className="spinner-border"
                                                    role="status"
                                                    style={{color:"#BE9FC9",margin:"20px"}}
                                                >
                                                    <span className="sr-only">
                                                        Loading...
                                                    </span>
                                                </div>
                                                Initial Login might take some time, please wait...
                                            </div>
                                            ) : null}
                                        </form>
                                    </div>
                                </div>
                            </div>{" "}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Login;
