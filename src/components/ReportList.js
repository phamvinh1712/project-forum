import React from "react";
import Table from "./ReportTable";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
class ReportList extends React.Component {
  render() {
    return (
        <div>
          <h4>Report list</h4>
          <div className="table-responsive">
                        <Table />

          </div>
        </div>
    );
  }
}

export default ReportList;
