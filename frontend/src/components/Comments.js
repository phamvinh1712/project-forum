import {Comment, Icon, Segment, Header, Image, Container, Form, Button} from 'semantic-ui-react';
import {Component} from "react";
//import "./Post.css"
import React from "react";
import Collapse from '@material-ui/core/Collapse';
import {FormControl, FormGroup} from "react-bootstrap";
import {toast} from "react-toastify";


export default class Comments extends Component {
  constructor(props) {
    super(props);
    console.log(props.comments)
    this.state = {
      down_vote_count: props.comment.down_vote_count,
      up_vote_count: props.comment.up_vote_count,
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

  handleVoteComment = (type) => {
    let info_message = (type==='UP') ? 'Upvote success' : 'Downvote success'
    fetch('/api/vote-comment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify({"type": type, "comment": this.state.id})
    })
      .then(res => {
        if (res.ok) return res.json()
        else {
          throw new Error('Something went wrong,please try again');
        }
      })
      .then(json => {
        this.setState({
          up_vote_count: json.up_vote_count,
          down_vote_count: json.down_vote_count
        })
        toast.info(info_message, {
            position: toast.POSITION.TOP_CENTER
          });
      })
      .catch(
        (error) => {
          toast.warn(error.toString, {
            position: toast.POSITION.TOP_CENTER
          });
        }
      );
  }

  handleVoteReply = (id, type) => {
    let info_message = (type==='UP') ? 'Upvote success' : 'Downvote success'
    fetch('/api/vote-reply/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify({"type": type, "reply": id})
    })
      .then(res => {
        if (res.ok) return res.json()
        else {
          throw new Error('Something went wrong,please try again');
        }
      })
      .then(json => {
        let replies = this.state.replies;
        console.log(json);
        let obj = replies.find((o, i) => {
            if (o.id === json.id) {
              Object.assign(replies[i], {
                up_vote_count: json.up_vote_count,
                down_vote_count: json.down_vote_count,
              });
              return true;
            }
          });
        this.setState({
          replies: replies
        })
        toast.info(info_message, {
            position: toast.POSITION.TOP_CENTER
          });
      })
      .catch(
        (error) => {
          toast.warn(error.toString, {
            position: toast.POSITION.TOP_CENTER
          });
        }
      );
  }


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
          <Comment.Action onClick={() => this.handleVoteComment('UP')}>
            <Icon link name='triangle up'/>
            {this.state.up_vote_count}
          </Comment.Action>
          <Comment.Action onClick={() => this.handleVoteComment('DOWN')}>
            <Icon link name='triangle down'/>
            {this.state.down_vote_count}
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
                  <Comment.Action onClick={() => this.handleVoteReply(value.id,'UP')}>
                    <Icon link name='triangle up'/>
                    {value.up_vote_count}
                  </Comment.Action>
                  <Comment.Action onClick={() => this.handleVoteReply(value.id,'DOWN')}>
                    <Icon link name='triangle down'/>
                    {value.down_vote_count}
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


