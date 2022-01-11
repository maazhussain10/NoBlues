import React, { Component } from "react";
import CampusNavbar from "./campusNavbar";
import axios from "axios";
import "../../css/campus.css";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
    comma: 188,
    enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

class Campus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            suggestions: [],
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    state = {
        queries: "",
        campusId: "",
        username: "",
        campusName: "",
        depressedPortal: false,
    };

    componentDidMount = async () => {
        await this.setState({
            username: localStorage.getItem("username"),
            campusName: localStorage.getItem("campusName"),
            campusId: localStorage.getItem("campusQkey"),
        });
        console.log(this.state.tags);
    };

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    async handleAddition(tag) {
        await this.setState((state) => ({ tags: [...state.tags, tag] }));
        console.log(this.state.tags);
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    post = async () => {
        await this.setState({
            queries: document.getElementById("floatingTextarea").value,
        });

        let { username, campusId, queries, tags } = this.state;
        console.log(username, campusId, queries, tags);
        try {
            axios({
                method: "get",
                url: "https://noblues.azurewebsites.net/postQuery",
                params: {
                    campusId: campusId,
                    username: username,
                    queries: queries,
                    tags: tags,
                },
            }).then((response) => {
                document.getElementById("floatingTextarea").value = "";
            });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const { tags } = this.state;
        return (
            <div className="Dashboard">
                <CampusNavbar />
                <div className="content">
                    <div className="form-floating">
                        <div className="label">Enter your Query</div>
                        <textarea
                            rows="6"
                            className="form-control h-50 textarea"
                            placeholder="Leave a comment here"
                            id="floatingTextarea"
                        ></textarea>
                        <div className="label">Enter Hashtags</div>
                        <div className="label">
                            <ReactTags
                                tags={tags}
                                handleDelete={this.handleDelete}
                                handleAddition={this.handleAddition}
                                handleDrag={this.handleDrag}
                                delimiters={delimiters}
                            />
                        </div>

                        <button
                            className="btn btn-success post"
                            type="button"
                            style={{ background: "#be9fc9" }}
                            onClick={() => this.post()}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Campus;
