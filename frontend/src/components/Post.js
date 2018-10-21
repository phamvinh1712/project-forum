import {Comment, Segment, Header, Image, Container} from 'semantic-ui-react';
import {Button, FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem, Modal} from "react-bootstrap";
import {Component} from "react";
import "./Post.css"
import {withStyles} from '@material-ui/core/styles';
import React from "react";
import Chip from '@material-ui/core/Chip';
import Comments from './Comments' ;
import {toast} from "react-toastify";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
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
const PostAPI = '/api/create-report/';
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
      input_email : "",
      show:false,
      reason:'',
      open: false,
    };
    this.handleChangeReason = this.handleChangeReason.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.CreatePost = this.CreatePost.bind(this);
  }
  handleChangeReason(event){
    this.setState({ reason: event.target.value })
  }      
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose1 = () => {
    this.setState({ open: false });
  };
  handleChange1 = () => { 
    this.setState({ open: false, check:true });
  };

  CreateReport = () =>{ 
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
        'comment':'',
        'hashtag':'',
        'post':this.props.match.params.id,
        'reply':'',
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

  handleChangeEmail = event => {
    this.setState({
      input_email : event.target.value
    });
  }

  handleShow = () => {
    this.setState({show:true})
  }

  handleClose = () => {
    this.setState({show:false})
  }

  handleSendMail = () => {
    fetch('/api/send_mail/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "content": "A post at project forum has been share for you,visit this link to see " +window.location.href,
        "email": this.state.input_email})
    })
      .then(res => {
        if(res.ok)
        toast.info("Email has been sended", {
            position: toast.POSITION.TOP_CENTER
          });
        else
          toast.error("Error!! Please try again", {
            position: toast.POSITION.TOP_CENTER
          });
      })

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

  handleClickHashtag = (event, id) => {
    let temp = "/hashtag/" + id;
    this.props.history.push(temp);
  }

  handleDelete = () => {
    let url = '/api/posts/delete/' + this.props.match.params.id + '/'
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
    })
      .then(res => {
        if (res.ok) {
          toast.info('Post deleted', {
            position: toast.POSITION.TOP_CENTER
          });
          this.props.history.push('/');
        }
      })
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
    const {classes} = this.props;

    const modalShare = (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="input_thread_title" bsSize="large">
              <ControlLabel>Email </ControlLabel>
              <FormControl
                type="email"
                value={this.state.input_email}
                onChange={this.handleChangeEmail}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
          <Button
            onClick={this.handleSendMail}
            variant="contained" color="primary"
            disabled={!(this.state.input_email.length > 0)}>Send mail</Button>
        </Modal.Footer>
      </Modal>
    )

    return (

      <div className="post">
        <Segment vertical>

          <Header as='h2'>{this.state.title}</Header>

        </Segment>
        <Segment vertical>
          <div style={{float: 'right', margin: '10px'}}>
            {(this.props.authenticated && (this.props.user.username === this.state.username || this.props.user.is_staff))
              ? <DropdownButton pullRight>
                <MenuItem eventKey="1" onClick={() => {
                  let temp = "/edit-post/:id".replace(":id", this.props.match.params.id);
                  this.props.history.push(temp);
                }}>Edit</MenuItem>
                <MenuItem eventKey="2" onClick={this.handleDelete}>Delete</MenuItem>
                <MenuItem eventKey="2" onClick={this.handleShow}>Share</MenuItem>
              </DropdownButton> :
              <DropdownButton pullRight>
                <MenuItem eventKey="2" onClick={this.handleShow}>Share</MenuItem>
              </DropdownButton>}
          </div>
          <p>Posted by </p>
          <Header as='h3'>
            <Image circular src={this.state.avatar} avatar/>
            {this.state.username}
          </Header>
          <Container fluid>
            <div dangerouslySetInnerHTML={{__html: this.state.content}}/>
            <div>
            <button onClick={this.handleClickOpen} type="button" className="btn btn-danger" style={{float: 'right', margin: '5px'}}>
              <span className="glyphicon glyphicon-flag" aria-hidden="true"></span> Report
            </button>
            <Dialog
          open={this.state.open}
          onClose={this.handleClose1}
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
                  {this.CreateReport()}
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
              <Chip label={value.name}
                    className={classes.chip}
                    onClick={event => this.handleClickHashtag(event, value.id)}/>
            )}</div>
          </Container>

        </Segment>
        {modalShare}
        <Segment>

          <Comment.Group threaded>
            <Header as='h3' dividing>
              Comments
            </Header>
            {this.state.comments.map(value =>
              <Comments authenticated={this.props.authenticated} comment={value}/>
            )}
            {(this.props.authenticated) ? <form onSubmit={this.handleSubmit}>
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
            </form> : null}
          </Comment.Group>
        </Segment>
      </div>
    );
  }
}

export default withStyles(styles)(Post);