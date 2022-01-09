import React, { Component } from "react";
import Pricing from "./pricing";
import "../../css/homepage.css";
import campusQ from "../../images/CampusQ.svg";
import chatConvo from "../../images/chat-convo1.svg";
import chooseCampus from "../../images/Choose.svg";
import registerCampus from "../../images/registerCampus.svg";
import campusShare from "../../images/CampusShare.svg";
import Navbar from "./navbar";
import Footer from "./footer";
class HomePage extends Component {
    state = {};
    componentDidMount() {
        localStorage.clear();
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="row g-3">
                    <div className=" row d-flex justify-content-center align-items-center">
                        <div className="col">
                            <h1 className="heading">NoBlues</h1>
                            <h3 className="tagline">
                                We build technology solutions that transform the
                                world of education and empower students, staff and faculty.
                            </h3>
                        </div>
                        <div className="col">
                            <img
                                style={{ height: "550px" }}
                                src={campusQ}
                                alt="abc"
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{ borderTop: "1px solid grey" }}
                >
                    <div className="col">
                        <img
                            style={{ height: "550px" }}
                            src={chooseCampus}
                            alt="img2"
                        />
                    </div>
                    <div className="col">
                        <h3 className="title">
                            Choose your campus which you feel
                        </h3>
                        <p className="description">
                            Gain the competitive edge you need to meet
                            your enrollment and retention goals and help your
                            institution become agile and responsive to competitive pressures.
                        </p>
                    </div>
                </div>

                <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{ background: "#33325A" }}
                >
                    <div className="col">
                        <h3 className="title"  style={{ color: "#F0FFFF" }}>Visit our Depressed Portal</h3>
                        <p className="description"  style={{ color: "#FFFFFF" }}>
                            No need to take stress about being in a campus,
                            vent out the feelings to members of the same campus by being 
                            anonymous.
                        </p>
                    </div>
                    <div className="col">
                        <img
                            style={{ height: "550px" }}
                            src="https://static.vecteezy.com/system/resources/previews/003/009/908/non_2x/woman-in-depression-with-bewildered-thoughts-in-her-mind-vector.jpg"
                            alt="img2"
                        />
                    </div>
                </div>

                <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{ borderTop: "1px solid grey" }}
                >
                    <div className="col">
                        <img
                            style={{ height: "550px" }}
                            src={chatConvo}
                            alt="img2"
                        />
                    </div>
                    <div className="col">
                        <h3 className="title">
                            Get to know your new Campus
                        </h3>
                        <p className="description">
                            Being in a new place has always been a hectic task,
                            CampusQ brings in a change by letting you mingle with the
                            members of the same campus by getting to know how things
                            work in your campus.
                        </p>
                    </div>
                </div>

                <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{ borderTop: "1px solid grey" }}
                >
                    <div className="col">
                        <h3 className="title">Share your old stuffs to your juniors</h3>
                        <p className="description">
                            Not want to waste your new books to go in vain,
                            sell it to your juniors belonging to the same organization 
                            for the price you want. Buy the books from our site
                            without worrying about anything.
                        </p>
                    </div>
                    <div className="col">
                        <img
                            style={{ height: "550px" }}
                            src={campusShare}
                            alt="img2"
                        />
                    </div>
                </div>

                <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{ borderTop: "1px solid grey" }}
                >
                    <div className="col">
                        <img
                            style={{ height: "550px" }}
                            src={registerCampus}
                            alt="img2"
                        />
                    </div>
                    <div className="col">
                        <h3 className="title">Register your Organization</h3>
                        <p className="description">
                            We understand that not all organisations are the same. That's
                            why our solutions come with a range of fully customisable
                            options, to enhance your customers' experience, as well
                            as meet your business and brand objectives.
                        </p>
                    </div>
                </div>

                <Pricing />
                <Footer/>
            </div>
        );
    }
}

export default HomePage;
