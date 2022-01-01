import React, { Component } from 'react'
import CampusNavbar from './campusNavbar';
import axios from 'axios'
import '../../css/campus.css'
// import { Redirect } from 'react-router';
class AnswerQuery extends Component {
    state = { Query: "", answers: [], CampusName: "", queryId: "", username: "", isAdmin: false }
    componentDidMount = async () => {
        await this.setState({ username: localStorage.getItem('username'), CampusName: localStorage.getItem('CampusName'), queryId: this.props.location.state.queryId, Query: this.props.location.state.Query, isAdmin: this.props.location.state.isAdmin })
        this.getQueryAnswers()
    }

    getQueryAnswers = () => {

        let { queryId } = this.state

        try {
            axios({
                method: 'get',
                url: 'http://localhost:5000/getqueryanswers',
                params: {
                    queryId: queryId
                }

            }).then(response => {
                this.setState({ answers: response.data })

            })
        }

        catch (e) {
            console.log(e)
        }



    }

    reply = () => {

        let reply = document.getElementById('replybox').value

        let { username, CampusName, queryId } = this.state

        try {
            axios({
                method: 'get',
                url: 'http://localhost:5000/queryreply',
                params: {
                    CampusName: CampusName,
                    username: username,
                    reply: reply,
                    queryId: queryId
                }

            }).then(response => {
                document.getElementById('replybox').value = ""
                this.getQueryAnswers()


            })
        }

        catch (e) {
            console.log(e)
        }



    }


    deleteQuery = (queryId) => {
        try {
            axios({
                method: 'get',
                url: 'http://localhost:5000/deletequery',
                params: {
                    queryId: queryId

                }

            }).then(response => {

            })
        }

        catch (e) {
            console.log(e)
        }

    }

    render() {
        let { isAdmin, Query, queryId, answers } = this.state

        return (

            <div className="Dashboard">
                <CampusNavbar />



                <div className="content">
                    <div className="textarea" >
                        <div className='myquery' >

                            <span>
                                {Query}
                            </span>
                            {isAdmin ?
                                <span className="delete" onClick={() => this.deleteQuery(queryId)}>
                                    <i className="fas fa-trash"></i>
                                </span> : null}
                        </div>
                        <textarea rows="3" className="form-control h-15 answerinput" placeholder="Clear the query" id="replybox"></textarea>
                        <button className="post1" type="button" onClick={() => this.reply()}>Reply</button>

                        {answers.map((answer, index) => (
                            <div className="replies">
                                {isAdmin ?
                                    <span className="deleteanswer" onClick={() => this.deleteAnswer(queryId)}>
                                        <i className="fas fa-trash"></i>
                                    </span> : null}
                                <span className="like" onClick={() => this.like(queryId)}>
                                    <i className="fas fa-star"></i>
                                </span>
                                <div className="answerbox" >
                                    <div className="answerfield">
                                        <span>{answer.user_name}</span>
                                        <span className="date">{answer.date.slice(0, 10)}</span>
                                    </div>

                                    <div className="answer">{answer.answers}</div></div>


                            </div>
                        ))}
                    </div>
                </div>
            </div >



        );
    }
}

export default AnswerQuery;



