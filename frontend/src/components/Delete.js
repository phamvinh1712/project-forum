import React from 'react';
import Button from "@material-ui/core/Button/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
const DeleteAPI = '/api/reports/delete/';
class Delete extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            check:false,
            open:false,
        };
       this.DeletePost = this.DeletePost.bind(this);
       this.handleChange = this.handleChange.bind(this);
    }
    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    handleChange = () => { 
        this.setState({ open: false, check:true });
      };
      DeletePost = (event) => {
        fetch(DeleteAPI + event,
        {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token').toString()
          },          
        })
      };
    render(){
        return (
            <div>
        <Button onClick={this.handleClickOpen}>Delete</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleChange} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              No
            </Button>
            <div>
            {this.state.check ? (
                <div>
                  {this.DeletePost('2'+'/')} 
                 </div>
             ) : (
                null 
              )
            }
            </div>
          </DialogActions>
          </Dialog>
          </div>
        );
    }
}
export default Delete;
