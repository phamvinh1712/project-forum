import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "@material-ui/core/Button/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
const API = '/api/create-report/';
const rea = {'reason':''};
class Report extends React.Component{ 
    constructor(props) {
        super(props);
        this.state = {
              check:false,
              open:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.SendData = this.SendData.bind(this);
      }
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
      handleChange() {
        this.setState({check : true});
      }

      SendData(read){ 
            rea.reason = read
            fetch(API ,
            {
            method: 'POST' ,
            body: JSON.stringify(rea)
            })
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data)
            })
        }
      render() {
        return (
          <Button onClick={this.handleClickOpen}> Report </Button> 
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <label>
              <h3>Reason: </h3>  
              <input type="text" id="reason" />
            </label>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
             <button><p onClick={this.handleChange}> Report </p> </button>
            </Button>
            
            <Button onClick={this.handleClose} color="primary" autoFocus>
              No
            </Button>
            {this.state.check ? (
               <div>
                  {this.SendData(document.getElementById('reason').nodeValue)}
                 </div>

             ) : (
                null 
              )
            }
          </DialogActions>
          </Dialog>
        );
      }        
    }
export default Report;