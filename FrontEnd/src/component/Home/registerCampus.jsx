import React, { Component } from "react";
import Navbar from "./navbar";
import axios from "axios";
import "../../css/homepage.css";

class RegisterCampus extends Component {
    state = {
        campusName: "",
        planType: "",
        campusType: "",
        noOfPersons: "",
        campusLogo: "",
        campusEmail: "",
        campusPassword: "",
    };

    registerCampus = async () => {
        await this.setState({
            campusName: document.getElementById("campusName").value,
            campusType: document.getElementById("campusType").value,
            planType: document.getElementById("planType").value,
            noOfPersons: document.getElementById("noOfPersons").value,
            campusEmail: document.getElementById("campusEmail").value,
            campusLogo: document.getElementById("campusLogo").value,
            campusPassword: document.getElementById("campusPassword").value,
        });

        let {
            campusName,
            campusType,
            planType,
            noOfPersons,
            campusEmail,
            campusLogo,
            campusPassword,
        } = this.state;
        try {
            axios({
                method: "post",
                url: "https://noblues.azurewebsites.net/registerCampus",
                params: {
                    campusName: campusName,
                    campusType: campusType,
                    planType: planType,
                    noOfPersons: noOfPersons,
                    campusEmail: campusEmail,
                    campusLogo: campusLogo,
                    campusPassword: campusPassword,
                },
            }).then((response) => {
                alert("Your CampusQKey is : ", response.data);
            });
        } catch (e) {
            console.log(e);
        }
    };
    render() {
        return (
            <>
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
                                        Register Your Campus
                                    </h3>
                                    <div className="row register-form">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="logo">
                                                    Campus Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="campusName"
                                                    placeholder="Campus Name *"
                                                />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="logo">
                                                    Type of Campus
                                                </label>
                                                <select
                                                    className="form-control"
                                                    id="campusType"
                                                >
                                                    <option
                                                        className="hidden"
                                                        selected
                                                        disabled
                                                    >
                                                        Select your Campus Type
                                                    </option>
                                                    <option>
                                                        Educational Institution
                                                    </option>
                                                    <option>
                                                        Corporate Campus
                                                    </option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="logo">
                                                    No Of Persons
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="noOfPersons"
                                                    placeholder="No of Persons *"
                                                />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="logo">
                                                    Campus Logo
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="campusLogo"
                                                    placeholder="Campus Logo URL"
                                                />
                                            </div>
                                            <br />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="logo">
                                                    Select Plan
                                                </label>
                                                <select
                                                    className="form-control"
                                                    id="planType"
                                                >
                                                    <option
                                                        className="hidden"
                                                        selected
                                                        disabled
                                                    >
                                                        Select your Plan Type
                                                    </option>
                                                    <option>Basic Plan</option>
                                                    <option>
                                                        Standard Plan
                                                    </option>
                                                    <option>
                                                        Premium Plan
                                                    </option>
                                                </select>
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="logo">
                                                    Campus Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="campusEmail"
                                                    placeholder="Campus Email *"
                                                />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="logo">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    id="campusPassword"
                                                    placeholder="Password *"
                                                />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label htmlFor="logo">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    id="campusConfirmPassword"
                                                    placeholder="Confirm Password *"
                                                />
                                            </div>
                                            <br />
                                            <input
                                                type="button"
                                                onClick={() =>
                                                    this.registerCampus()
                                                }
                                                className="btnRegister"
                                                defaultValue="Register"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default RegisterCampus;
