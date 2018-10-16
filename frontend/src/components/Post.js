import { Comment, Icon, Segment, Header, Image, Container, Form, Button} from 'semantic-ui-react';
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
      comments: []
    };
  }

    componentDidMount() {
    let url = 'http://localhost:8000/api/posts/' + this.props.match.params.id.toString() + '/'
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
          <Image circular src={this.state.avatar} avatar />
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
              <Comments comment = {value}/>
            )}
            <Form reply>
              <Form.TextArea/>
              <Button content='Add Comment' labelPosition='left' icon='edit' primary/>
            </Form>
          </Comment.Group>
        </Segment>
      </div>
    );
  }
}
export default Post;
