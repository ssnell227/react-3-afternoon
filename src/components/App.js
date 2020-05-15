import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Posts from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts")
      .then(res => {
        this.setState({ posts: res.data })
        console.log(res.data)
      })
      .catch(err => {
        if (err) {
          console.log(err)
        }
      })
  }

  updatePost(postId, newText) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${postId}`, {
      newText
    })
      .then(res => {
        this.setState({ posts: res.data })
      })
      .catch(err => {
        if (err) {
          console.log(err)
        }
      })
  }

  deletePost(postId) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${postId}`)
      .then(res => {
        this.setState({ posts: res.data })
      })
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text })
    .then(res => this.setState({ posts: res.data}))
  }

  render() {
    const { posts } = this.state;

    let postMap = posts.map(post => {
      return <Posts
        deletePostFn={this.deletePost}
        updatePostFn={this.updatePost}
        id={post.id} text={post.text}
        date={post.date}
        key={post.id} />
    })

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {postMap}
        </section>
      </div>
    );
  }
}

export default App;
