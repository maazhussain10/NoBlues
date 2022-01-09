import React, { Component } from "react";
import CampusNavbar from "../Campus/campusNavbar";
import campusShare from "../../images/CampusShare.svg";

class CampuShare extends Component {
    state = {};
    render() {
        return (
            <div>
                <CampusNavbar />
                <div
                    className="row d-flex justify-content-center align-items-center"
                    style={{ borderTop: "1px solid grey"}}
                >
                    <div className="col">
                        <h3 className="title">
                            Share your old stuffs to your juniors
                        </h3>
                        <p className="description">
                            Not want to waste your new books to go in vain, sell
                            it to your juniors belonging to the same
                            organization for the price you want. Buy the books
                            from our site without worrying about anything.
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
            </div>
        );
    }
}

export default CampuShare;
