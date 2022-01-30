import React, { Component } from "react";
import "../../css/homepage.css";

class Pricing extends Component {
    render() {
        return (
            <>
                <div
                    className="container-fluid pricing"
                    style={{
                        background: "#F0FFFF",
                        borderTop: "1px solid grey",
                    }}
                >
                    <div>
                        <center>
                            <h1>Pricing</h1>
                        </center>
                    </div>
                    <div className="container p-4">
                        <div className="row">
                            <div className="col-lg-4 col-md-12 mb-4">
                                <div className="card h-100 w-100 shadow-lg">
                                    <div className="card-body">
                                        <div className="text-center p-3">
                                            <h5 className="card-title">
                                                Basic
                                            </h5>
                                            <small>Small Organization</small>
                                            <br />
                                            <br />
                                            <span className="h2" style={{color:"#be9fc9"}}>Free</span>
                                            <br />
                                            <br />
                                        </div>
                                        <p className="card-text">
                                            Basic plan of CampusQ allows you
                                            with the following features.
                                        </p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <img
                                                src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/25/000000/external-group-cyber-security-kiranshastry-solid-kiranshastry.png"
                                                alt=""
                                            />{" "}
                                            500 Participants Club
                                        </li>
                                        <li className="list-group-item">
                                            <i className="fas fa-users"></i>{" "}
                                            Campus Broadcast Messaging
                                        </li>
                                        <li className="list-group-item">
                                            <i className="fas fa-shield-alt"></i>{" "}
                                            Interact with Authenicated accounts
                                        </li>
                                        <li className="list-group-item">
                                            <i className="far fa-comments"></i>{" "}
                                            Get your Queries solved
                                        </li>
                                        <li className="list-group-item">
                                            <img
                                                src="https://img.icons8.com/material-sharp/23/000000/portal.png"
                                                alt=""
                                            />{" "}
                                            Portal to Depressed World
                                        </li>
                                    </ul>

                                    <div className="card-body text-center">
                                        <a
                                            className="btn btn-outline-dark btn-lg selectButton"
                                            style={{ borderRadius: "20px" }}
                                            href="/registration?plan=basic"
                                        >
                                            Select
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 mb-4">
                                <div className="card h-100 w-100 shadow-lg">
                                    <div className="card-body">
                                        <div className="text-center p-3">
                                            <h5 className="card-title">
                                                Standard
                                            </h5>
                                            <small>Large Business</small>
                                            <br />
                                            <br />
                                            <span className="h2" style={{color:"#be9fc9"}}>$499</span>
                                            /month
                                            <br />
                                            <br />
                                        </div>
                                        <p className="card-text">
                                            The standard plan allows 1500
                                            Participants for free and
                                            $0.55/person beyond that.
                                        </p>
                                    </div>

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <img
                                                src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/25/000000/external-group-cyber-security-kiranshastry-solid-kiranshastry.png"
                                                alt=""
                                            />{" "}
                                            1500 Participants Club
                                        </li>
                                        <li className="list-group-item">
                                            <i className="fas fa-users"></i>{" "}
                                            Campus Broadcast Messaging
                                        </li>
                                        <li className="list-group-item">
                                            <i className="fas fa-shield-alt"></i>{" "}
                                            Interact with Authenicated accounts
                                        </li>
                                        <li className="list-group-item">
                                            <i className="far fa-comments"></i>{" "}
                                            Get your Queries solved
                                        </li>
                                        <li className="list-group-item">
                                            <i className="fas fa-people-arrows"></i>{" "}
                                            Make Campus Deals
                                        </li>
                                        <li className="list-group-item">
                                            <i className="far fa-star"></i>{" "}
                                            Track Campus Engagement
                                        </li>
                                        <li className="list-group-item">
                                            <img
                                                src="https://img.icons8.com/material-sharp/23/000000/portal.png"
                                                alt=""
                                            />{" "}
                                            Portal to Depressed World
                                        </li>
                                    </ul>
                                    <div className="card-body text-center">
                                        <a
                                            className="btn btn-outline-dark btn-lg selectButton"
                                            style={{ borderRadius: "20px" }}
                                            href="/registration?plan=standard"
                                        >
                                            Select
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 mb-4">
                                <div className="card h-100 w-100 shadow-lg">
                                    <div className="card-body">
                                        <div className="text-center p-3">
                                            <h5 className="card-title">
                                                Premium
                                            </h5>
                                            <small>Large Companies</small>
                                            <br />
                                            <br />
                                            <span className="h2" style={{color:"#be9fc9"}}>$899</span>
                                            /month
                                            <br />
                                            <br />
                                        </div>
                                        <p className="card-text">
                                            The premium plan allows unlimited
                                            participants to be in connection
                                            with CampusQ
                                        </p>
                                    </div>

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <img
                                                src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/25/000000/external-group-cyber-security-kiranshastry-solid-kiranshastry.png"
                                                alt=""
                                            />{" "}
                                            Unlimited Participants Club
                                        </li>
                                        <li className="list-group-item">
                                            <i className="fas fa-users"></i>{" "}
                                            Campus Broadcast Messaging
                                        </li>
                                        <li className="list-group-item">
                                            <i className="fas fa-shield-alt"></i>{" "}
                                            Interact with Authenicated accounts
                                        </li>
                                        <li className="list-group-item">
                                            <i className="far fa-comments"></i>{" "}
                                            Get your Queries solved
                                        </li>
                                        <li className="list-group-item">
                                            <i className="fas fa-people-arrows"></i>{" "}
                                            Make Campus Deals
                                        </li>
                                        <li className="list-group-item">
                                            <i className="far fa-star"></i>{" "}
                                            Track Campus Engagement
                                        </li>
                                        <li className="list-group-item">
                                            <img
                                                src="https://img.icons8.com/material-sharp/23/000000/portal.png"
                                                alt=""
                                            />{" "}
                                            Portal to Depressed World
                                        </li>
                                    </ul>
                                    <div className="card-body text-center ">
                                        <a
                                            className="btn btn-outline-dark btn-lg selectButton"
                                            style={{ borderRadius: "20px" }}
                                            href="/registration?plan=premium"
                                        >
                                            Select
                                        </a>
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

export default Pricing;
