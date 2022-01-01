import React, { Component } from 'react'
import DashboardNavbar from '../dashboardNavbar';
class CampuShare extends Component {
    state = {}
    render() {
        return (
            <div>
                < DashboardNavbar />
                <div className="col md-6">
                    <h3 className="tagline2" >Check out our latest feature CampuShare!</h3>
                    <img className="image" src="https://www.tawk.to/wp-content/uploads/2020/08/Get-Close.png" alt="img" />
                </div>
            </div>
        );
    }
}

export default CampuShare;

