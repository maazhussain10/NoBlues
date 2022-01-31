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
import Loader from "./loader";
class HomePage extends Component {
    state = {
        loading: true,
    };

    async componentDidMount() {
        if (localStorage.getItem("loading") === "false") {
            if(localStorage.getItem("loading")==="false")
            this.setState({ loading: false});
        }
        this.fakeRequest().then(() => {
                this.setState({ loading: false });
                localStorage.setItem("loading", false);
        });
    }

    fakeRequest = () => {
        return new Promise((resolve) => setTimeout(() => resolve(), 20000));
    };

    render() {
        if (this.state.loading) {
            return <Loader/>;
        }

        return (
            <div>
                <Navbar />
                <div className="row g-3">
                    <div className=" row d-flex justify-content-center align-items-center">
                        <div className="col">
                            <h1 className="heading">NoBlues</h1>
                            <h3 className="tagline">
                                We build technology solutions that work on
                                driving away blues, increase campus engagement
                                and make mental health a priority.
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
                            Belong to more than one campus
                        </h3>
                        <p className="description">
                            NoBlues gives individuals the chance of registering
                            for more than a single campus! They can choose which
                            campus they feel like engaging in from the
                            dashboard.{" "}
                        </p>
                    </div>
                </div>

                <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{ background: "#33325A" }}
                >
                    <div className="col">
                        <h3 className="title" style={{ color: "#F0FFFF" }}>
                            Visit our Depressed Portal
                        </h3>
                        <p className="description" style={{ color: "#FFFFFF" }}>
                            Our Depressed Portal is there for you anytime you're
                            feeling blue, vent out your frustations to members
                            of your campus(who could relate to it) while being
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
                        <h3 className="title">Get to know your new Campus</h3>
                        <p className="description">
                            Being in a new place has always been nerve wrecking,
                            NoBlues brings in a change by letting you mingle
                            with your campusmates, get to know them, ask queries
                            about how things work in your campus.
                        </p>
                    </div>
                </div>

                <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{ borderTop: "1px solid grey" }}
                >
                    <div className="col">
                        <h3 className="title">
                            Sell/Buy used products at reduced prices
                        </h3>
                        <p className="description">
                            Don't want to waste your almost-new books to go in
                            vain? sell it to your juniors using our campus-share
                            feature, malpractices would be hard to pull when
                            both the buyers and sellers belong to the same
                            campus!
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
                            We understand that not all organisations are the
                            same. That's why our solutions come with a range of
                            fully customisable options, to enhance your
                            customers' experience, as well as meet your business
                            and brand objectives.
                        </p>
                    </div>
                </div>

                <Pricing />
                <Footer />
            </div>
        );
    }
}

export default HomePage;
