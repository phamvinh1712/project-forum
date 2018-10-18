import {Comment, Segment, Header, Image, Container} from 'semantic-ui-react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import {Component} from "react";
import "./Post.css"
import React from "react";
import Comments from './Comments' ;

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      username: "",
      avatar: "",
      content: "",
      comments: [],
      comment : ""
    };
  }

  handleChange = event => {
    this.setState({
      comment: event.target.value
    });
  }

// function handle submit onclick event
  handleSubmit = event => {
    event.preventDefault();
    const comment = this.state.comment;

    fetch('/api/create-comment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify({"content": comment, "post":this.props.match.params.id})
    })
    .then(res => res.json())
      .then(json => {
        let newComment=this.state.comments
        newComment.push(json)
        this.setState({comments: newComment,comment:""})
      });
  }


  componentDidMount() {
    let url = '/api/posts/' + this.props.match.params.id.toString() + '/'
    fetch(url, {
      method: 'GET',
    })
      .then(res => {
        return res.json();
      }).then(json => {
      this.setState({
        title: json.title,
        content: json.content,
        avatar: json.user.profile.avatar,
        username: json.user.username,
        comments: json.comments
      })
    })


  }

  render() {
    return (
      <div className="post">
        <Segment vertical>

          <Header as='h2'>{this.state.title}</Header>

        </Segment>
        <Segment vertical>
          <p>Posted by </p>
          <Header as='h3'>
            <Image circular src={this.state.avatar} avatar/>
            {this.state.username}
          </Header>
          <Container fluid>
            <div dangerouslySetInnerHTML={{__html: this.state.content}}/>

          </Container>
        </Segment>
        <Segment>
          <Comment.Group threaded>
            <Header as='h3' dividing>
              Comments
            </Header>
            {this.state.comments.map(value =>
              <Comments comment={value}/>
            )}
             <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="comment">
                <ControlLabel>Comment</ControlLabel>
                <FormControl
                  value={this.state.comment}
                  onChange={this.handleChange}
                  componentClass="textarea"/>
              </FormGroup>
              <Button
                disabled={!(this.state.comment.length >0)}
                type="submit">
                Add comment
              </Button>
            </form>
          </Comment.Group>
        </Segment>
      </div>
    );
  }
}

export default Post;
