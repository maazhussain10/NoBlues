import React, { Component } from "react";

class Footer extends Component {
    render() {
        return (
            <div>
                <footer class="page-footer font-small unique-color-dark">
                    <div class="container text-center text-md-left mt-5">
                        <div class="row mt-3">
                            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 class="text-uppercase font-weight-bold">
                                    Campus Q
                                </h6>
                                <hr
                                    class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                                    style={{ width: "60px"}}
                                />
                                <p>
                                    We build technology solutions that transform the
                                    world of education and empower students,
                                    staff and faculty.
                                </p>
                            </div>

                            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase font-weight-bold">
                                    Features
                                </h6>
                                <hr
                                    class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                                    style={{width: "60px"}}
                                />
                                <p>
                                    Software support
                                </p>
                                <p>
                                    Event scheduling
                                </p>
                                <p>
                                    Connecting Campuses
                                </p>
                                <p>
                                    Depression Portal
                                </p>
                            </div>

                            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 class="text-uppercase font-weight-bold">
                                    Useful links
                                </h6>
                                <hr
                                    class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                                    style={{width: "60px"}}
                                />
                                <p>
                                    <a href="#!">Register with us</a>
                                </p>
                                <p>
                                    <a href="#!">Become an Affiliate</a>
                                </p>
                                <p>
                                    <a href="#!">Privacy Policy</a>
                                </p>
                                <p>
                                    <a href="#!">Help</a>
                                </p>
                            </div>

                            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 class="text-uppercase font-weight-bold">
                                    Contact
                                </h6>
                                <hr
                                    class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                                    style={{width: "60px"}}
                                />
                                <p>
                                    <i class="fas fa-home mr-3"></i> India
                                </p>
                                <p>
                                    <i class="fas fa-envelope mr-3"></i>{" "}
                                    campusq@gmail.com
                                </p>
                                <p>
                                    <i class="fas fa-phone mr-3"></i> +91 99411 65707
                                </p>
                                <p>
                                    <i class="fas fa-print mr-3"></i> @campus_q
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="footer-copyright text-center py-3">
                    Copyright © 2022:
                        <a href="https://mdbootstrap.com/">{" "} CampusQ</a>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;
