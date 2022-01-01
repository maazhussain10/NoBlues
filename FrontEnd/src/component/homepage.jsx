import React, { Component } from "react";
import Pricing from './pricing';
import "../css/homepage.css";
import Navbar from "./navbar";
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
                    <div className="mainheight">
                        <h1 className="heading">Losers</h1>
                        <img
                            className="logo"
                            src="https://www.campusq.com.au/media/eylfozps/undraw_creative_team_r90h.svg"
                            alt="abc"
                        />
                        <h3 className="tagline">We are your new Juicer!</h3>
                    </div>
                </div>

                <div className="row g-3 logos">
                    <div className="col md-6">
                        <h3 className="tagline2">
                            Check out our latest feature CampuShare!
                        </h3>

                        <img
                            className="image"
                            src="https://www.tawk.to/wp-content/uploads/2020/08/Get-Close.png"
                            alt="img"
                        />
                    </div>
                    <div className="col md-6">
                        <h3 className="tagline2">
                            Vent out to the people who feel you!
                        </h3>
                        <div>
                            <img
                                className="image"
                                src="https://www.tawk.to/wp-content/uploads/2020/08/Get-in-Front.png"
                                alt="img2"
                            />
                        </div>
                    </div>
                </div>

                <Pricing/>
                <h2 className="subline">
                    All the Features, without the price tag
                </h2>

                <div className="row g-3 rows">
                    <div className="col md-4">
                        <div className="padding1">
                            <i class="fas fa-users"></i> Campus Broadcast
                            Messaging{" "}
                        </div>
                        <div className="padding1">
                            <i class="fas fa-hashtag"></i> Add Customized
                            Hashtags
                        </div>
                        <div className="paddingb1">
                            <i class="far fa-window-restore"></i> Get Custom
                            Tabs{" "}
                        </div>
                    </div>
                    <div className="col md-4">
                        <div className="padding2">
                            {" "}
                            <i class="far fa-comments"></i> Get your Queries
                            solved
                        </div>
                        <div className="padding2">
                            {" "}
                            <i class="fas fa-shield-alt"></i> Interact with
                            Authenicated accounts{" "}
                        </div>
                        <div className="paddingb">
                            {" "}
                            <i class="far fa-star"></i> Track Campus Engagement
                        </div>

                        <div> </div>
                    </div>
                    <div className="col md-4">
                        <div className="padding3">
                            {" "}
                            <i class="fas fa-lock"></i> Ensured Secure
                            Encryption
                        </div>
                        <div className="padding3">
                            {" "}
                            <i class="fas fa-people-arrows"></i> Make Campus
                            Deals
                        </div>
                        <div className="paddingb">
                            {" "}
                            <i class="fas fa-user-tie"></i> Meet Campus
                            Representatives
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
