import React, { Component } from "react";
import { ExcelRenderer, OutTable } from "react-excel-renderer";

class Dashboard2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      cols: []
    };
  }
//  WORKING CODE ---------------------
  changeHandler(event) {
    let fileObj = event.target.files[0];
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        });
        console.log(this.state);
      }
    });
  }
  //  WORKING CODE ---------------------


  render() {
    return (
      <div>
        <h1>Upload File</h1>
        <input
          className="btn"
          type="file"
          onChange={this.changeHandler.bind(this)}
          style={{ padding: "10px" }}
        />
        <OutTable
          data={this.state.rows}
          columns={this.state.cols}
          tableClassName="ExcelTable2019"
          tableHeaderRowClass="heading"
        />
      </div>
    );
  }
}

export default Dashboard2;