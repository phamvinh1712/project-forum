import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./CreatePost.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CreatableSelect from 'react-select/lib/Creatable';
import {Link} from "react-router-dom";
// CreatePost Page
export default class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      title: '', hashtags: [],
      input_hashtag: [],
      isLoading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
  }

  handleChange(value) {
    this.setState({text: value})
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value})
  }

// function handle submit onclick event
  handleSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const text = this.state.text;
    const hashtag = this.state.input_hashtag.map(value => value.value)
    console.log()
    fetch('/api/create-post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify({"title": title,
        "content": text,
        "sub_thread": this.props.match.params.handle,
        "hashtags": hashtag})
    })
      .then(res => {
        if (res.ok)
          return res.json()
      })
      .then(json => {
        let temp = "/posts/" + json.id;
        this.props.history.push(temp);
      });
  }

  handleCreate = (inputValue: any) => {
    this.setState({isLoading: true});
    fetch('/api/hashtags/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify({"name": inputValue})
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(json => {
        console.log(json);
        let {hashtags, input_hashtag} = this.state;

        const newOption = {value: json.id.toString(), label: json.name}
        this.setState({
          isLoading: false,
          hashtags: [...hashtags, newOption],
          input_hashtag: [...input_hashtag, newOption],
        })
      });
  }

  handleChangeSelect = (newValue: any, actionMeta: any) => {
    this.setState({input_hashtag: newValue});
  };

  componentDidMount() {
    fetch('/api/hashtags/')
      .then(res => {
        if (res.ok)
          return res.json()
      })
      .then(json => {
        let hashtags = json.map(n => {
          return {value: n.id.toString(), label: n.name}
        })
        this.setState({hashtags: hashtags})
      });
  }


// main screen
  render() {
    return (
      <div className="CreatePost">
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
              modules={CreatePost.modules}
              onChange={this.handleChange}>

            </ReactQuill>
          </FormGroup>
          <CreatableSelect
            isMulti
            isClearable
            name="colors"
            options={this.state.hashtags}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.handleChangeSelect}
            onCreateOption={this.handleCreate}
            isDisabled={this.state.isLoading}
            isLoading={this.state.isLoading}
            value={this.state.input_hashtag}
          />
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
            Post
          </Button>
        </form>
      </div>
    );
  }
}
CreatePost
  .modules = {
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