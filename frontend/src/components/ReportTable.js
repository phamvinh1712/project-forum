import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';/
import React from "react";
const API = '/api/report/';
class ReportTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      open: false,
      open2: false,
      open3: false,
    };
  
  }
  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ list: data });
      })
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
              <th>Type</th>
              <th>Status</th>
              <th>Time</th>
              <th>User</th>
              <th>Behavior</th>
              <th>Alert</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(function (value) {
              var behaviour;
              if(value.post){
                behaviour = 'Post'
              }
              if(value.comment){
                behaviour = 'Comment'
              }
              if(value.reply){
                behaviour ='Reply'
              }
              if(value.hashtag){
                behaviour = 'Hashtag'
              }
              return (<tr>
                <td>{value.id}</td>
                <td>{value.type}</td>
                <td>{value.status}</td>
                <td>{value.create_time}</td>
                <td>{value.user.username}</td>
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
              <p>{value.hashtag.id}</p>
              <p>{value.hashtag.name}</p>
              <p>{value.hashtag.post_count}</p>
              <p>{value.hashtag.create_time}</p>
            </DialogContentText>
          </DialogContent>
          </Dialog>

                </td>
                <td>
                <p>
                  <span
                    className="btn btn-primary btn-sm"
                   className="btn btn-primary btn-sm" onClick={this.handleClickOpen}><i className="fa fa-exclamation-triangle"></i>
                  </span>
                </p>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to alert this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
              </td>

                  <td>
                <p>
                  <span
                    className="btn btn-primary btn-sm" style={{background:'red'}}
                   className="btn btn-primary btn-sm" onClick={this.handleClickOpen2}><i className="fa fa-trash"></i>
                  </span>
                </p>
        <Dialog
          open={this.state.open2}
          onClose={this.handleClose2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose2} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose2} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
              </td>

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