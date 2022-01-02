import React, { Component } from 'react'
import DashboardNavbar from './dashboardNavbar';
import axios from 'axios'
import '../css/dashboard.css'
import { Redirect } from 'react-router';
class Dashboard extends Component {
    state = { campusDetails: [], status: false, selected: false, campusName: "" }


    componentDidMount = () => {
        localStorage.removeItem('CampusQkey')
        localStorage.removeItem('CampusName')
        this.getCampusDetails();
    }

    selectedCampus = (campus) => {
        let campusName = campus.campusName;
        localStorage.setItem('campusName', campusName)
        localStorage.setItem('campusQkey', campus.campusId)
        this.setState({ selected: true, campusName: campusName })

    }

    getCampusDetails = () => {
        let username = localStorage.getItem('username');
        try {
            axios({
                method: 'get',
                url: 'http://localhost:5000/getCampusDetails',
                params: {
                    username: username
                }
            }).then(response => {
                if (response.data) 
                    this.setState({ campusDetails: response.data, status: true });
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {

        if (this.state.selected) {
            let username = localStorage.getItem('username')
            let { campusName } = this.state
            return (
                <Redirect to={{
                    pathname: `/${username}/${campusName}`,
                    state: { username: username, campusName: campusName }
                }} />
            )

        }

        else {
            // let { campusDetails } = this.state;
            if (this.state.status) {
            }
            return (
                <div className="Dashboard">
                    <DashboardNavbar />
                    <div className="Headline">
                        <h3>Die in your campus</h3>
                    </div>
                    {
                        this.state.campusDetails.map((campus, index) => (
                            <div className="outercard" onClick={() => this.selectedCampus(campus)}>
                                <div className="card" style={{ width: '15rem' }}>
                                    <img className="circle" src={campus.campusLogo} alt="..." />
                                    <div className="card-body cardname">
                                        <h5 key={index} className="card-title ">{campus.campusId}</h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="empty"></div>
                    <br>
                    </br>
                </div >
            );
        }
    }
}

export default Dashboard;

