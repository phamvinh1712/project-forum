import React, {Component} from 'react';
import ThreadEdit from './ThreadEdit';
import DragIndicator from '@material-ui/icons/DragIndicator';
import Button from '@material-ui/core/Button';
import {ControlLabel, FormControl, FormGroup, Modal} from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import {toast} from 'react-toastify';

const DragHandle = SortableHandle(() => <DragIndicator/>
);

const SortableItem = SortableElement(({value}) =>
  <div>
    <DragHandle/>
    <ThreadEdit value={value}/>
  </div>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul style={{listStyle: 'none'}}>
      {items.map((value, index) => (
        <SortableItem key={value.id} index={index} value={value}/>
      ))}
    </ul>
  );
});


class ThreadEditList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      threads: [],
      input_display_flag :false
    };
  }

  componentDidMount() {

    fetch('/api/admin-threads/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({threads: data});
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleCheck = name => event => {
    this.setState({[name]: event.target.checked});
  };

  handleClose = () => {
    this.setState({show: false});
  }

  handleOpen = () => {
    this.setState({show: true})
  }

  handleSubmit = () => {
    const title = this.state.input_thread_title;
    const description = this.state.input_description;
    const display_flag = this.state.input_display_flag;
    fetch('/api/create-thread/'.replace(':id', this.state.id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "display_flag": display_flag
      })
    })
      .then(res => res.json())
      .then(json => {
        let new_threads = this.state.threads;
        let new_thread = json;
        new_thread['sub_thread'] = []
        new_threads.unshift(new_thread)
        this.setState({show: false, threads: new_threads});
        toast.info("Add new thread success !", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }

  handleSaveOrder = () => {
    let body = this.state.threads.map((value, index) => {
      return {"id": value.id, "display_order": index + 1}
    })
    fetch('/api/update-thread-order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          threads: json
        })
        toast.info("Save order success !", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      threads: arrayMove(this.state.threads, oldIndex, newIndex),
    });
  };


  render() {

    const modalAddThread = (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thread edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="input_thread_title" bsSize="large">
              <ControlLabel>Title </ControlLabel>
              <FormControl
                type="text"
                value={this.state.input_thread_title}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="input_description" bsSize="large">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                value={this.state.input_description}
                onChange={this.handleChange}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel> Display </ControlLabel>
              <Checkbox
                checked={this.state.input_display_flag}
                onChange={this.handleCheck('input_display_flag')}
                value="input_display_flag"
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
          <Button
            onClick={this.handleSubmit}
            variant="contained" color="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    )
    return (
      <div>
        <SortableList items={this.state.threads} onSortEnd={this.onSortEnd} useDragHandle={true}/>
        <Button variant="contained" color="primary" onClick={this.handleOpen}>Add</Button>
        <Button variant="contained" onClick={this.handleSaveOrder}>Save order</Button>
        {modalAddThread}
      </div>
    );
  }
}

export default ThreadEditList;