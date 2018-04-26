import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }
    
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatePosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })

                this.setState({ posts: updatePosts});
            })
            .catch(error => {
                this.setState({ error: true });
            });;
    }

    postClickedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render () {
        let posts = null;
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return <Post
                    title={post.title}
                    body={post.body}
                    key={post.id}
                    author={post.author}
                    clicked={() => this.postClickedHandler(post.id)} />;
            });
        }
        else {
            posts = <p style={{ textAlign: 'center' }}>Somthing went wrong!</p>
        }

       

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;