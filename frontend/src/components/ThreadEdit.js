import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {FormGroup, FormControl, ControlLabel, Modal} from "react-bootstrap";
import Checkbox from '@material-ui/core/Checkbox';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import DragIndicator from '@material-ui/icons/DragIndicator';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = theme => ({
  root: {margin: '10px', display: 'inline-block', width: '90%'},
  rootList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  column: {
    flexBasis: '33.33%',
  },
});


class ThreadEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.value.id,
      thread_title: props.value.title,
      description: props.value.description,
      display_order: props.value.display_order,
      display_flag: props.value.display_flag,
      sub_thread: props.value.sub_thread,
      showEditThread: false,
      showEditSubThread: false,
      isCreateSubThread: false,
      currentSubThread: ''
    };
  }

  handleEditClose = () => {
    this.setState({
      showEditSubThread: false,
      showEditThread: false
    });
  }

  handleEditThreadOpen = () => {
    const {thread_title, description, display_order, display_flag, sub_thread, showEditThread} = this.state;
    this.setState({
      input_thread_title: thread_title,
      input_description: description,
      input_display_flag: display_flag,
      showEditThread: true
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleCheck = name => event => {
    this.setState({[name]: event.target.checked});
  };

  handleSubmitEdit = event => {
    event.preventDefault()
    const title = this.state.input_thread_title;
    const description = this.state.input_description;
    const display_flag = this.state.input_display_flag;
    fetch('/api/threads/:id/'.replace(':id', this.state.id), {
      method: 'PUT',
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
        this.setState({
          thread_title: json.title,
          description: json.description,
          display_flag: json.display_flag,
        })
      });
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      sub_thread: arrayMove(this.state.sub_thread, oldIndex, newIndex),
    });
  };

  handleEditSubThreadOpen = (id) => {
    let sub_thread = this.state.sub_thread.find(o => o.id === id);
    this.setState({
      input_sub_thread_title: sub_thread.sub_thread_title,
      input_sub_thread_description: sub_thread.description,
      input_sub_thread_display_flag: sub_thread.display_flag,
      showEditSubThread: true,
      isCreateSubThread :false,
      currentSubThread: id,
    })
  }

  handleAddSubThreadOpen = () => {
    this.setState({
      showEditSubThread: true,
      isCreateSubThread: true
    })
  }

  handleSubmitEditSubThread = event => {
    event.preventDefault()
    const title = this.state.input_sub_thread_title;
    const description = this.state.input_sub_thread_description;
    const display_flag = this.state.input_sub_thread_display_flag;
    let API = this.state.isCreateSubThread ? '/api/create-subthread/' : '/api/sub-threads/:id/'.replace(':id', this.state.currentSubThread);
    let method = this.state.isCreateSubThread ? 'POST' : 'PUT';
    let info_message = this.state.isCreateSubThread ? "Add subthread success" : "Edit subthread success!";
    fetch(API, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify({
        "sub_thread_title": title,
        "description": description,
        "display_flag": display_flag,
        "thread": this.state.id
      })
    })
      .then(res => res.json())
      .then(json => {
        let sub_thread = this.state.sub_thread;
        if (this.state.isCreateSubThread) {
          sub_thread.push(json);
        } else {
          let obj = sub_thread.find((o, i) => {
            if (o.id === this.state.currentSubThread) {
              Object.assign(sub_thread[i], {
                sub_thread_title: json.sub_thread_title,
                description: json.description,
                display_flag: json.display_flag,
              });
              return true;
            }
          });
        }
        this.setState({
          showEditSubThread: false,
          sub_thread: sub_thread
        })
        toast.info(info_message, {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }

  handleSaveOrder = () => {
    let body = this.state.sub_thread.map((value, index) => {
      return {"id": value.id, "display_order": index + 1}
    })
    fetch('/api/update-sub-thread-order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token').toString()
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          sub_thread: json
        })
        toast.info("Save order success !", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  }


  render() {
    const {classes} = this.props;
    const modalEditThread = (
      <Modal show={this.state.showEditThread} onHide={this.handleEditClose}>
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
          <Button onClick={this.handleEditClose}>Close</Button>
          <Button
            onClick={this.handleSubmitEdit}
            variant="contained" color="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    )

    const modalEditSubThread = (
      <Modal show={this.state.showEditSubThread} onHide={this.handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sub thread</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="input_sub_thread_title" bsSize="large">
              <ControlLabel>Title </ControlLabel>
              <FormControl
                type="text"
                value={this.state.input_sub_thread_title}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="input_sub_thread_description" bsSize="large">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                value={this.state.input_sub_thread_description}
                onChange={this.handleChange}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel> Display </ControlLabel>
              <Checkbox
                checked={this.state.input_sub_thread_display_flag}
                onChange={this.handleCheck('input_sub_thread_display_flag')}
                value="input_sub_thread_display_flag"
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleEditClose}>Close</Button>
          <Button
            onClick={this.handleSubmitEditSubThread}
            variant="contained" color="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    )

    const DragHandle = SortableHandle(() => <DragIndicator/>
    );

    const SortableItem = SortableElement(({value}) =>
      <div>
        <ListItem
          key={value.id}
          role={undefined}
          className={classes.listItem}
        >
          <ListItemIcon>
            <DragHandle/>
          </ListItemIcon>

          <ListItemText
            primary={value.sub_thread_title}
            secondary={value.description}
          />
          <ListItemSecondaryAction>
            <IconButton className={classes.button} aria-label="Edit"
                        onClick={() => this.handleEditSubThreadOpen(value.id)}>
              <EditIcon/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
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


    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>

            <div className={classes.column}>
              <Typography className={classes.heading}>{this.state.thread_title}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>{this.state.description}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.rootList}>
              <List>
                <SortableList items={this.state.sub_thread} onSortEnd={this.onSortEnd} useDragHandle={true}/>
              </List>
            </div>
          </ExpansionPanelDetails>
          <Divider/>
          <ExpansionPanelActions>
            <Button size="small" variant="contained" color="primary" onClick={this.handleAddSubThreadOpen}>Add
              subthread</Button>
            <Button size="small" variant="contained" color="secondary" onClick={this.handleEditThreadOpen}>Edit</Button>
            <Button size="small" variant="contained" onClick ={this.handleSaveOrder} >Save order</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
        {modalEditThread}
        {modalEditSubThread}
      </div>
    );
  }
}

export default withStyles(styles)(ThreadEdit);