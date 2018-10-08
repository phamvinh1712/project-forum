import React, {Component} from 'react';
import ThreadEdit from './ThreadEdit';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

class ThreadEditList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      threads : [
        {id: 1 ,display_order :1, title :'Thread A',expanded:true, subThreads: [
            {id: 1, display_order: 1, title: 'SubA-1'},
            {id: 2, display_order: 2, title: 'SubA-2'},
            {id: 3, display_order: 3, title: 'SubA-3'}
          ]},
        {id: 2 ,display_order :3, title :'Thread B',expanded:false, subThreads: [
            {id: 1, display_order: 1, title: 'SubB-1'},
            {id: 2, display_order: 3, title: 'SubB-2'},
            {id: 3, display_order: 2, title: 'SubB-3'}
          ]},
        {id: 3 ,display_order :2, title :'Thread C',expanded:true, subThreads: [
            {id: 1, display_order: 1, title: 'SubC-1'},
            {id: 2, display_order: 3, title: 'SubC-2'},
            {id: 3, display_order: 2, title: 'SubC-3'}
          ]},
      ]
    };
  }


  render() {
    return (
      <div>
        <FormControlLabel control = {<Switch/>} label = 'Expand all'/>
        {this.state.threads.sort(((a, b) => a.display_order-b.display_order)).map((value) => (
          <ThreadEdit value = {value}>
          </ThreadEdit>
        ))}
        <Button variant="contained" color="primary">Add</Button>
      </div>
    );
  }
}

export default ThreadEditList;