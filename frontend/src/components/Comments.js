import {Comment, Icon, Segment, Header, Image, Container, Form, Button} from 'semantic-ui-react';
import {Component} from "react";
//import "./Post.css"
import React from "react";
import Collapse from '@material-ui/core/Collapse';
import Reply from './Reply';
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";


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
      replies: [],
      reply: ""

    };
  }

  handleChange = event => {
    this.setState({
      reply: event.target.value
    });
  }
  handleSubmit = event => {
    event.preventDefault();
    const reply = this.state.reply;

    fetch('/api/create-reply/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify({"content": reply, "comment": this.state.id})
    })
      .then(res => res.json())
      .then(json => {
        let newReply = this.state.replies
        newReply.push(json)
        this.setState({replies: newReply, reply: ""})
      });
  }
  handleReplyClick = () => {
    let url = '/api/comments/' + this.state.id + '/replies/'
    fetch(url, {
      method: 'GET',
    })
      .then(res => {
        return res.json();
      }).then(json => {
      this.setState({
        replies: json
      })
      this.setState(state => ({checked: !state.checked}));
    })
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
          <button type="button" className="btn btn-default btn-sm align-left">
            <span className="glyphicon glyphicon-flag" aria-hidden="true"></span>
          </button>
        </Comment.Actions>
      </Comment.Content>

      <Collapse in={this.state.checked}>
        <Comment.Group>
          {this.state.replies.map(value =>
            <Comment>
              <Comment.Avatar as='a' src={value.user.profile.avatar}/>
              <Comment.Content>
                <Comment.Author as='a'>{value.user.username}</Comment.Author>
                <Comment.Metadata>
                  <span>{value.create_time}</span>
                </Comment.Metadata>
                <Comment.Text>{value.content}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>
                    <Icon link name='triangle up'/>
                    5
                  </Comment.Action>
                  <Comment.Action>
                    <Icon link name='triangle down'/>
                    5
                  </Comment.Action>
                   <button type="button" className="btn btn-default btn-sm align-left">
                  <span className="glyphicon glyphicon-flag" aria-hidden="true"></span>
                </button>
                </Comment.Actions>

              </Comment.Content>
            </Comment>
          )}
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="reply">
              <FormControl
                value={this.state.reply}
                onChange={this.handleChange}
                componentClass="textarea"/>
            </FormGroup>
            <Button
              disabled={!(this.state.reply.length > 0)}
              type="submit">
              Add reply
            </Button>
          </form>
        </Comment.Group>

      </Collapse>
    </Comment>)
  }
}


