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
                    style={{ borderTop: "1px solid grey" }}
                >
                    <div className="col">
                        <h3 className="title">
                            Sell/Buy used products at reduced prices
                        </h3>
                        <p className="description">
                            Don't want your almost-new books to go in vain? Sell them to your juniors using our campus-share feature, scams are hard to pull when both the buyer and seller belongs to the same campus!
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
