import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "@material-ui/core/Button/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {FormControl, ControlLabel, FormGroup} from 'react-bootstrap';
const PostAPI = '/api/create-report/';
localStorage.setItem('token','4c11d21aa1c4c6c1ed2396c8a4727430efc15b63');
class Report extends React.Component{ 
    constructor(props) {
        super(props);
        this.state = {
              check:false,
              open:false,
              reason:'',
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
    
      handleClose = () => {
        this.setState({ open: false });
      };
      handleChange = () => { 
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
                'comment':2,
                'hashtag':'',
                'post':'',
                'reply':'',
                'user':2,
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

      render() {
        return (
          <div>
          <Button onClick={this.handleClickOpen}> Report </Button> 
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
            <Button onClick={this.handleChange} color="primary">
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
        );
      }        
    }
export default Report;