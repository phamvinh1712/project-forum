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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const styles = theme => ({
  root : {margin :'10px'},
  rootList: {
    width: '90%',
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class ThreadEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      threadTitle :props.value.title,
      subThreads: props.value.subThreads
    };
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={this.props.value.expanded}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{this.state.threadTitle}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className={classes.rootList}>
              <List>
                {this.state.subThreads.sort((a,b) =>a.display_order-b.display_order).map(value => (
                  <ListItem
                    key={value.id}
                    role={undefined}
                    className={classes.listItem}
                  >
                    <ListItemText primary={value.title}/>
                    <ListItemSecondaryAction>
                      <IconButton className={classes.button} aria-label="Delete">
                        <DeleteIcon/>
                      </IconButton>
                      <IconButton className={classes.button} aria-label="Edit">
                        <EditIcon/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </ExpansionPanelDetails>
          <Divider/>
          <ExpansionPanelActions>
            <Button size="small" variant="contained" color="primary">Add</Button>
            <Button size="small" variant="contained" color="secondary">Disable</Button>
            <Button size="small" variant="contained" color="secondary">Delete</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(ThreadEdit);