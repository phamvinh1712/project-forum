import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import React from "react";
const API = '/api/report/';
const DeleteAPI = '/api/reports/delete/';
class ReportTable extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      behave: {},
      open: false,
      open2: false,
      open3: false,
      open4: false,
      check: false,
      id: '',
      check1: true,
    };
 }
  handleClickOpen4 = () => {
     this.setState({ open4: true });
   };
   handleClose4 = () => {
    this.setState({ open4: false });
  };
   handleChange = () => { 
     this.setState({ open4: false, check: true });
   };

   DeleteReport = (event) => {
      this.state.check = false;
     fetch(DeleteAPI + event,
     {
     method: 'DELETE',
     headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Token ' + localStorage.getItem('token').toString()
       },          
     })
   };  
  componentDidMount() {
    fetch(API,
    {
      method: 'GET',
    }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ list: data });
      }).catch(err => console.log(err));
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen2 = () => {
    this.setState({ open2: true });
  };
  
  handleClose2 = () => {
    this.setState({ open2: false });
  };

  handleClose3 = () => {
    this.setState({ open3: false });
  };
  handleClickOpen3 = () => {
    this.setState({ open3: true });
  };


  render() {
    return (
      <div>
        <table id="mytable" className="table table-bordred table-striped">
          <thead>
            <tr>
              <th>Id</th>              
              <th>Behavior</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Time</th>
              <th>User</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(function (value) {
              var behaviour;
              if(value.post){
                behaviour = 'Post'
                this.state.behave = value.post
              }
              if(value.comment){
                behaviour = 'Comment'
                this.state.behave = value.comment
              }
              if(value.reply){
                behaviour ='Reply'
                this.state.behave = value.reply
              }
              if(value.hashtag){
                behaviour = 'Hashtag'
                this.state.behave = value.hashtag
              }
              return (
              <tr>
                <td>{value.id}</td>
                <td>
                <p>
                  <span
                    className="btn btn-primary btn-sm" style={{background:'WhiteSmoke ',border:'none',color:'black'}}
                   className="btn btn-primary btn-sm" onClick={this.handleClickOpen3}>{behaviour}
                  </span>
                </p>
          <Dialog
          open={this.state.open3}
          onClose={this.handleClose3}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <p>Id: {this.state.behave.id}</p>
            <p>user: {this.state.behave.user.username}</p>
            <p>Content: {this.state.behave.content}</p>
            <p>Time: {this.state.behave.create_time}</p>
            </DialogContentText>
          </DialogContent>
          </Dialog>

                </td>
                <td>{value.reason}</td>
                <td>{value.status}</td>
                <td>{value.create_time}</td>
                <td>{value.user.username}</td>
                <td>
                <p>
                  <span
                    className="btn btn-primary btn-sm" style={{background:'red'}}
                   className="btn btn-primary btn-sm" onClick={this.handleClickOpen4}><i className="fa fa-trash"></i>
                  </span>
                </p>
        <Dialog
          open={this.state.open4}
          onClose={this.handleClose4}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this report?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleChange}  color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose4} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
              </td>
              <div>
              {this.state.check ? (
                  <div>
                    {this.DeleteReport(value.id +'/')} 
                   </div>
               ) : (
                  null 
                )
              }
              </div>            
              </tr>              
              )
            }.bind(this))}  
            

          </tbody>
        </table>
      </div>
    )  
  } 
}
export default ReportTable;