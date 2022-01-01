import React, { Component } from 'react'
import CampusNavbar from './campusNavbar';
import axios from 'axios'
import '../../css/campus.css'
// import { Redirect } from 'react-router';
class Campus extends Component {
    state = { queries: "", hashtag: "", username: "", CampusName: "" }
    componentDidMount = () => {
        this.setState({ username: localStorage.getItem('username'), CampusName: localStorage.getItem('CampusName') })
    }

    post = () => {
        let tempqueries = document.getElementById('floatingTextarea').value
        let temphashtag = document.getElementById('floatingTextarea1').value

        this.setState({ queries: tempqueries, hashtag: temphashtag })
        let { username, CampusName } = this.state

        try {
            axios({
                method: 'get',
                url: 'http://localhost:5000/postquery',
                params: {
                    CampusName: CampusName,
                    username: username,
                    queries: tempqueries,
                    hashtag: temphashtag
                }

            }).then(response => {
                document.getElementById('floatingTextarea').value = ""
                document.getElementById('floatingTextarea1').value = ""

            })
        }

        catch (e) {
            console.log(e)
        }



    }



    render() {


        return (

            <div className="Dashboard">
                <CampusNavbar />



                <div className="content">
                    <div className="form-floating">
                        <textarea rows="10" className="form-control h-50 textarea" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                        <label className="label" for="floatingTextarea"> Clear your campus queries here!</label>
                        <textarea rows="4" className="form-control h-20 textarea1" placeholder="Leave a comment here" id="floatingTextarea1"></textarea>
                        <label className="label2" for="floatingTextarea1">Add hashtags </label>
                        <button className="post" type="button" onClick={() => this.post()}>Post</button>
                    </div>

                </div>
            </div>



        );
    }
}

export default Campus;



