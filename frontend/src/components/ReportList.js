import React from "react";
import Table from "./ReportTable";
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