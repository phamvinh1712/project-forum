import {Comment, Segment, Header, Image, Container} from 'semantic-ui-react';
import {Button, FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem} from "react-bootstrap";
import {Component} from "react";
import "./Post.css"
import { withStyles } from '@material-ui/core/styles';
import React from "react";
import Chip from '@material-ui/core/Chip';
import Comments from './Comments' ;
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
const PostAPI = '/api/create-report/';
  const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      username: "",
      avatar: "",
      content: "",
      comments: [],
      comment: "",
      hashtags: [],
      reason:'',
      check:false,
      open:false,
    };
  this.handleChangeReason = this.handleChangeReason.bind(this)
  this.handleChange1 = this.handleChange1.bind(this);
  this.CreatePost = this.CreatePost.bind(this);
}
handleChangeReason(event){
  this.setState({ reason: event.target.value })
}      
handleClickOpen = () => {
  this.setState({ open: true });
};

handleClose = () => {
  this.setState({ open: false });
};
handleChange1 = () => { 
  this.setState({ open: false, check:true });
};
CreatePost = () =>{ 
      fetch(PostAPI ,
      {
      method: 'POST' ,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify(
        {
          'status':'WAITING',
          'reason':this.state.reason,
          'comment':this.state.comment,
          'hashtag':this.state.hashtag,
          'post':this.state.post,
          'reply':'',
          'user':this.state.username,
        }
      )
      })
      .then(function(response){
          return response.json()
      })
      .then(function(data){
          console.log(data)
      })
  };


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
      body: JSON.stringify({"content": comment, "post": this.props.match.params.id})
    })
      .then(res => res.json())
      .then(json => {
        let newComment = this.state.comments
        newComment.push(json)
        this.setState({comments: newComment, comment: ""})
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
        console.log(json);
      this.setState({
        title: json.title,
        content: json.content,
        avatar: json.user.profile.avatar,
        username: json.user.username,
        comments: json.comments,
        hashtags: json.hashtags
      })
    })


  }

  render() {
    const { classes } = this.props;
    return (

      <div className="post">
        <Segment vertical>

          <Header as='h2'>{this.state.title}</Header>

        </Segment>
        <Segment vertical>
          <div style={{float: 'right',margin:'10px'}}>
          <DropdownButton pullRight
          >

            <MenuItem eventKey="1" onClick={()=>{
              let temp = "/edit-post/:id".replace(":id", this.props.match.params.id);
              this.props.history.push(temp);
            }}>Edit</MenuItem>
            <MenuItem eventKey="2">Delete</MenuItem>
          </DropdownButton>
          </div>
          <p>Posted by </p>
          <Header as='h3'>
            <Image circular src={this.state.avatar} avatar/>
            {this.state.username}
          </Header>
          <Container fluid>
            <div dangerouslySetInnerHTML={{__html: this.state.content}}/>


            <div>
            <button onClick={this.handleClickOpen} type="button" className="btn btn-danger" style={{float: 'right',margin:'5px'}}>
             <span className="glyphicon glyphicon-flag" aria-hidden="true"></span> Report
            </button>
            <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogContent>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Reason</ControlLabel>
          <FormControl
              type="reason"
              value={this.state.reason}
              onChange={this.handleChangeReason}
            />
          <FormControl.Feedback />
        </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleChange1} color="primary">
                     Report
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              No
            </Button>
            <div>
            {this.state.check ? (
                <div>
                  {this.CreatePost()}
                 </div>

             ) : (
                null 
              )
            }
            </div>
          </DialogActions>
          </Dialog>
           </div>
            <div> {this.state.hashtags.map(value =>
               <Chip label={value.name} className={classes.chip}/>
            )}</div>
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
                disabled={!(this.state.comment.length > 0)}
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

export default withStyles(styles)(Post);
