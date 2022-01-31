import React, { Component } from "react";
import "../../css/homepage.css";
import axios from "axios";
import Navbar from "./navbar";

class Signup extends Component {
    state = {
        firstName: "",
        lastName: "",
        username: "",
        dob: "",
        email: "",
        password: "",
        confirmPassword: "",
        campusQKey: "",
        camnpusInfo: [],
        signupStatus: false,
    };

    campusQKeyValue = async () => {
        await this.setState({
            campusQKey: document.getElementById("campusQKey").value,
        });
        if (this.state.campusQKey.length === 8) {
            try {
                axios({
                    method: "get",
                    url: "https://noblues.azurewebsites.net/getCampus",
                    params: {
                        campusQKey: this.state.campusQKey,
                    },
                }).then((response) => {
                    this.setState({ camnpusInfo: response.data });
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    registerUser = async () => {
        await this.setState({
            firstName: document.getElementById("firstname").value,
            lastName: document.getElementById("lastname").value,
            username: document.getElementById("username").value,
            dob: document.getElementById("dob").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirmpassword").value,
        });
        let {
            firstName,
            lastName,
            username,
            dob,
            email,
            campusQKey,
            password,
            confirmPassword,
        } = this.state;
        if (!(firstName, lastName, username, dob, email, campusQKey, password, confirmPassword === "")) {
            try {
                axios({
                    method: "post",
                    url: "https://noblues.azurewebsites.net/signup",
                    params: {
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                        dob: dob,
                        campusQKey: campusQKey,
                        email: email,
                        password: password,
                        confirmpassword: confirmPassword,
                    },
                }).then((response) => {
                    this.setState({ signupStatus: true });
                    alert("Account Created Successfully");
                });
            } catch (e) {
                console.log(e);
            }
        }
        else {
            alert("Please, fill in all the details!")
        }
    };

    render() {
        return (
            <div className="divn">
                <Navbar />
                <div className="container register" style={{ marginTop: "1%" }}>
                    <div className="row">
                        <div className="col-md-3 register-left"></div>
                        <div className="col-md-9 register-right">
                            <div className="tab-content" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="home"
                                    role="tabpanel"
                                    aria-labelledby="home-tab"
                                >
                                    <h3 className="register-heading">
                                        Sign Up
                                    </h3>
                                    <div className="register-form">
                                        <div className="row g-3">
                                            <div className="col mb-3 input-group flex-nowrap">
                                                <span
                                                    className="input-group-text"
                                                    id="addon-wrapping"
                                                >
                                                    <i className="fas fa-user-graduate"></i>
                                                </span>
                                                <input
                                                    required
                                                    id="firstname"
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="FirstName"
                                                    aria-label="FirstName"
                                                    aria-describedby="addon-wrapping"
                                                />
                                            </div>
                                            <div className="col mb-3 input-group flex-nowrap">
                                                <span
                                                    className="input-group-text"
                                                    id="addon-wrapping"
                                                >
                                                    <i className="fas fa-address-card"></i>
                                                </span>
                                                <input
                                                    required
                                                    id="lastname"
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="LastName"
                                                    aria-label="LastName"
                                                    aria-describedby="addon-wrapping"
                                                />
                                            </div>
                                        </div>

                                        <div className="row g-3">
                                            <div className="input-group col mb-3 flex-nowrap">
                                                <span
                                                    className="input-group-text"
                                                    id="addon-wrapping"
                                                >
                                                    <i className="fas fa-user-tag"></i>
                                                </span>
                                                <input
                                                    required
                                                    id="username"
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Username"
                                                    aria-label="UserName"
                                                    aria-describedby="addon-wrapping"
                                                />
                                            </div>
                                            <div className="input-group col mb-3 flex-nowrap">
                                                <span
                                                    className="input-group-text"
                                                    id="addon-wrapping"
                                                >
                                                    <i className="far fa-calendar-alt"></i>
                                                </span>
                                                <input
                                                    required
                                                    id="dob"
                                                    type="date"
                                                    className="form-control form-control-lg"
                                                    placeholder="Date Of Birth (DD/MM/YYYY)"
                                                    aria-label="Date Of Birth"
                                                    aria-describedby="addon-wrapping"
                                                />
                                            </div>
                                        </div>

                                        <div className="row g-3">
                                            <div className="input-group col mb-3 flex-nowrap">
                                                <span
                                                    className="input-group-text"
                                                    id="addon-wrapping"
                                                >
                                                    <i className="fas fa-key"></i>
                                                </span>
                                                <input
                                                    required
                                                    id="campusQKey"
                                                    type="text"
                                                    minLength="8"
                                                    maxLength="8"
                                                    onChange={() =>
                                                        this.campusQKeyValue()
                                                    }
                                                    className="form-control form-control-lg"
                                                    placeholder="CampusQ Key"
                                                    aria-label="UserName"
                                                    aria-describedby="addon-wrapping"
                                                />
                                            </div>
                                            <div className="input-group col mb-3 flex-nowrap">
                                                {
                                                    this.state.campusInfo
                                                        ?.campusName
                                                }{" "}
                                                <span className="input-group-text">
                                                    {
                                                        this.state.camnpusInfo
                                                            .campusName
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        <div className="input-group mb-3 flex-nowrap">
                                            <span
                                                className="input-group-text"
                                                id="addon-wrapping"
                                            >
                                                <i className="fas fa-at"></i>
                                            </span>
                                            <input
                                                required
                                                id="email"
                                                type="email"
                                                className="form-control form-control-lg"
                                                placeholder="Email"
                                                aria-label="Email"
                                                aria-describedby="addon-wrapping"
                                            />
                                        </div>
                                        <div className="row g-3">
                                            <div className="input-group col mb-3 flex-nowrap">
                                                <span
                                                    className="input-group-text"
                                                    id="addon-wrapping"
                                                >
                                                    <i className="fas fa-unlock-alt"></i>
                                                </span>
                                                <input
                                                    required
                                                    id="password"
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    placeholder="Password"
                                                    aria-label="Password"
                                                    aria-describedby="addon-wrapping"
                                                />
                                            </div>
                                            <div className="input-group col mb-3 flex-nowrap">
                                                <span
                                                    className="input-group-text"
                                                    id="addon-wrapping"
                                                >
                                                    <i className="fas fa-lock"></i>
                                                </span>
                                                <input
                                                    required
                                                    id="confirmpassword"
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    placeholder="ConfirmPassword"
                                                    aria-label="ConfirmPassword"
                                                    aria-describedby="addon-wrapping"
                                                />
                                            </div>
                                        </div>
                                        <input
                                            type="button"
                                            className="btnRegister1"
                                            onClick={() => this.registerUser()}
                                            defaultValue="Sign Up"
                                        />
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

export default Signup;
