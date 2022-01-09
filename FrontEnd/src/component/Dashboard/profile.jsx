import React, { Component } from "react";
import DashboardNavbar from "./dashboardNavbar";
class Profile extends Component {
    state = {};
    render() {
        return (
            <div>
                <DashboardNavbar />
                <section
                    className="vh-100"
                    style={{ backgroundColor: "#f4f5f7" }}
                >
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-6 mb-4 mb-lg-0">
                                <div
                                    className="card"
                                    style={{
                                        borderRadius: ".5rem",
                                        height: "100%",
                                        width: "100%",
                                    }}
                                >
                                    <div className="row g-0">
                                        <div
                                            className="col-md-4 gradient-custom text-center text-white"
                                            style={{
                                                borderTopLeftRadius: ".5rem",
                                                borderBottomLeftRadius: ".5rem",
                                            }}
                                        >
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                alt="Avatar"
                                                className="img-fluid my-5"
                                                style={{ width: 80 }}
                                            />
                                            <h5>Marie Horwitz</h5>
                                            <p>Web Designer</p>
                                            <i className="far fa-edit mb-5" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-4">
                                                <h6>Information</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Email</h6>
                                                        <p className="text-muted">
                                                            info@example.com
                                                        </p>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Phone</h6>
                                                        <p className="text-muted">
                                                            123 456 789
                                                        </p>
                                                    </div>
                                                </div>
                                                <h6>Campus</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Recently Joined</h6>
                                                        <p className="text-muted">
                                                            Microsoft
                                                        </p>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Most Viewed</h6>
                                                        <p className="text-muted">
                                                            RMKEC
                                                        </p>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Queries Posted!</h6>
                                                        <p className="text-muted">
                                                            count(queries
                                                            posted)
                                                        </p>
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Doubts Cleared!</h6>
                                                        <p className="text-muted">
                                                            count(answers given)
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-start">
                                                    <a href="#!">
                                                        <i className="fab fa-facebook-f fa-lg me-3" />
                                                    </a>
                                                    <a href="#!">
                                                        <i className="fab fa-twitter fa-lg me-3" />
                                                    </a>
                                                    <a href="#!">
                                                        <i className="fab fa-instagram fa-lg" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Profile;
