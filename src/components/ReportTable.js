import React from "react";
import './statistic.css';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
class ReportTable extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             list: [{username: 'vinh', time: '28/3/2017', email: '@gmail.com', behaviour: 'begging'},
                 {username: 'vinh', time: '28/3/2017', email: '@gmail.com', behaviour: 'begging'},
                 {username: 'vinh', time: '28/3/2017', email: '@gmail.com', behaviour: 'begging'},
                 {username: 'vinh', time: '28/3/2017', email: '@gmail.com', behaviour: 'begging'},
             ],
             open: false,
             open2: false,
         };
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

  render() {
    return (
      <div>
        <table id="mytable" className="table table-bordred table-striped">
          <thead>
            <tr>
              <th>username</th>
              <th>Time</th>
              <th>Email</th>
              <th>Behavior</th>
              <th>Report</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {this.state.list.map(value => (
              <tr>
              <td>{value.username}</td>
              <td>{value.time}</td>
              <td>{value.email}</td>
              <td>{value.behaviour}</td>
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
              No
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Yes
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
              No
            </Button>
            <Button onClick={this.handleClose2} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
              </td>

              </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReportTable;
