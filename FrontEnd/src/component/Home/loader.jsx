import React, { Component } from "react";

class Loader extends Component {
    state = {};
    render() {
        return (
            <div
                class="loader-container row d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "white", height: "100vh" }}
            >
                <div
                    class="spinner-border text-primary col-md-6"
                    style={{width:"6rem", height: "6rem"}}
                ></div>
                <div class="col-md-6" style={{ marginLeft: "40px" }}>
                    <img
                        src="https://white-mushroom-06d462210.azurestaticapps.net/static/media/Logo.cfc6f0dd.png"
                        alt="NoBlues Logo"
                        style={{width:"80px", height:"80px"}}
                    />
                    <h1>Welcome to NoBlues</h1>
                    <h3>
                        Prep Yourself To Experience The Best Of Your Campus Life
                        And Drive Away Those Everyday Blues As Far As Possible.
                    </h3>
                </div>
            </div>
        );
    }
}

export default Loader;
