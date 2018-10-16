import {Comment, Icon, Segment, Header, Image, Container, Form, Button} from 'semantic-ui-react';
import {Component} from "react";
//import "./Post.css"
import React from "react";
import Collapse from '@material-ui/core/Collapse';

export default class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      id: props.comment.id,
      username: props.comment.user.username,
      avatar: props.comment.user.profile.avatar,
      create_time: props.comment.create_time,
      content: props.comment.content,
    };
  }

  handleReplyClick = () => {
    this.setState(state => ({checked: !state.checked}));
  };


  render() {
    return (<Comment>

      <Comment.Avatar circular src={this.state.avatar}/>
      <Comment.Content>
        <Comment.Author as='a'>{this.state.username}</Comment.Author>
        <Comment.Metadata>
          <span>{this.state.create_time}</span>
        </Comment.Metadata>
        <Comment.Text>{this.state.content}</Comment.Text>
        <Comment.Actions>
          <Comment.Action onClick={this.handleReplyClick}>Reply</Comment.Action>
          <Comment.Action>
            <Icon link name='triangle up'/>
            5
          </Comment.Action>
          <Comment.Action>
            <Icon link name='triangle down'/>
            5
          </Comment.Action>
        </Comment.Actions>
        <Collapse in={this.state.checked}>
          <Form reply>
            <Form.TextArea/>
            <Button content='Add Reply' labelPosition='left' icon='edit' primary/>
          </Form>
        </Collapse>
      </Comment.Content>
    </Comment>)
  }
}


