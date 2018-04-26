import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPosts: null,
        error: false
    }

    componentDidUpdate () {        
        if(this.props.id) {
            if (!this.state.loadedPosts || (this.state.loadedPosts.id !== this.props.id)){
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                    .then(response => {
                        this.setState({ loadedPosts: response.data });
                    });
            }

        }
    }

    deletePosthandler = () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.state.loadedPosts.id)
            .then(response => {
                console.log(response);
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}} >Please select a Post!</p>;

        if(this.props.id) {
            
            post = <p style={{ textAlign: 'center' }} >Loading..</p>;
        }
        if (this.state.loadedPosts) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPosts.title}</h1>
                    <p>{this.state.loadedPosts.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePosthandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
       
        return post;
    }
}

export default FullPost;