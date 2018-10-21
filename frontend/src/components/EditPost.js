import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

// Edit Post Page
export default class EditPost extends Component {
  constructor(props) {
    super(props)
    this.state = {text: '', title: ''} // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
  }

  handleChange(value) {
    this.setState({text: value})
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value})
  }

  componentDidMount() {
    let url = '/api/posts/' + this.props.match.params.id.toString() + '/'
    fetch(url, {
      method: 'GET',
    })
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error('Something went wrong')
      }).then(json => {
      this.setState({
        sub_thread: json.sub_thread,
        view_count: json.view_count,
        title: json.title,
        text: json.content
      })
    })
      .catch(function (error) {
        toast.error(error.toString, {
          position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push('/');
      }.bind(this));


  }

// function handle submit onclick event
  handleSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const text = this.state.text;
    fetch('/api/edit-post/:id/'.replace(":id", this.props.match.params.id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify({
        "title": title,
        "content": text,
        "sub_thread": this.state.sub_thread,
        "view_count": this.state.view_count
      })
    })
      .then(function (res) {
        if (res.ok) {
          let temp = "/posts/:id".replace(":id", this.props.match.params.id);
          this.props.history.push(temp);
        } else throw new Error('You may not have the permission to do this')
      }.bind(this))
      .catch(function (error) {
        toast.error(error.toString(), {
          position: toast.POSITION.TOP_CENTER
        });
      }.bind(this))

  }

// main screen
  render() {
    return (
      <div className="EditPost">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="title" bsSize="large">
            <ControlLabel>Tittle</ControlLabel>
            <FormControl

              type="tittle"
              value={this.state.title}
              onChange={this.handleChangeTitle}
            />
          </FormGroup>
          <FormGroup controlId="content" bsSize="large">
            <ControlLabel>Content</ControlLabel>

            <ReactQuill
              value={this.state.text}
              modules={EditPost.modules}
              onChange={this.handleChange}>

            </ReactQuill>
          </FormGroup>
          <Button className='Cancelbutton'
                  block
                  bsSize="small"
                  type="submit"
                  onClick={this.props.history.goBack}>
            Cancel
          </Button>
          <Button className='Postbutton'

                  bsSize="small"
                  type="submit"
          >
            Save
          </Button>
        </form>
      </div>
    );
  }
}
EditPost.modules = {
  toolbar: [
    [{'header': '1'}, {'header': '2'}, {'font': []}],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
      {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}