import React, { Component } from "react";
import LinkList from "../linksList";
import "./Results.css";
import AmortizationChart from "../amortization";
// import Navbar from "../layout/Navbar";
// import AmortizationChart from "../amortization";

class Results extends Component {
  render() {
    return (
      <div>
        {/* <Navbar /> */}
        <div className="results">
          <h3>Results</h3>
        </div>

        <div className="row">
          <div className="col s1"></div>
          <div className="col s5 skeleton rbox">dropdown menus go here</div>
          <div className="col s5 skeleton rbox">results graph goes here</div>
          <div className="col s1"></div>
        </div>
        <div className="row">
          <div className="col s12 links">
            <LinkList />
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
