import React, { Component } from 'react'
import '../css/homepage.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Navbar from './navbar';

class Login extends Component {
    state = { loginauth: false, username: "" }
    Login = () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        try {
            axios({
                method: 'post',
                url: 'http://localhost:5000/login',
                params: {
                    email: email,
                    password: password
                }

            }).then(response => {
                if (response.data) this.setState({ loginauth: true, username: response.data[0].username });
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    redirectToDashboard = (username) => {
        return (
            <Redirect to={`/${username}/dashboard`} />);
    }
    render() {
        if (this.state.loginauth) {
            localStorage.setItem('username', this.state.username)
            return (
                <Redirect to={`/${this.state.username}/dashboard`} />

            )
        }
        else {


            return (

                <div className="divn">
                    <Navbar />
                    <form className="form">
                        <div className="logintext">
                            <h1 className="loginfont">Login</h1>
                        </div>
                        <div className="input-group mb-4 flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping"><i className="fas fa-at"></i></span>
                            <input id="email" type="email" className="form-control form-control-lg" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" />
                        </div>
                        <div className="input-group mb-4 flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping"><i className="fas fa-unlock-alt"></i></span>
                            <input id="password" type="password" className="form-control form-control-lg" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" />
                        </div>
                        <button className="btn btn-outline-secondary btn-lg loginbtn" type="button" onClick={() => this.Login()}>Login</button>
                    </form>

                </div>);
        }
    }
}

export default Login;