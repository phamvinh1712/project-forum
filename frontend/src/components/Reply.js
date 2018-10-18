import {Comment, Icon, Segment, Header, Image, Container, Form, Button} from 'semantic-ui-react';
import {Component} from "react";
//import "./Post.css"
import React from "react";
import Collapse from '@material-ui/core/Collapse';

export default class Reply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.replies.id,
      username: props.replies.user.username,
      avatar: props.replies.user.profile.avatar,
      create_time: props.replies.create_time,
      content: props.replies.content,
    };
  }
  //
  // handleReplyClick = () => {
  //   this.setState(state => ({checked: !state.checked}));
  // };


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
          <Comment.Action>
            <Icon link name='triangle up'/>
            5
          </Comment.Action>
          <Comment.Action>
            <Icon link name='triangle down'/>
            5
          </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>)
  }
}


