import React, { Component } from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

// const data = [
//   ["Payment", "Percent of Monthly Cost"],
//   ["Principle and Interest", 12],
//   ["Monthly Tax", 5],
//   ["Monthly Insurance", 4] // CSS-style declaration
// ];
const options = {
  title: "Percentage of Cost",
  pieHole: 0.4,
  is3D: false
};
class PieChart extends Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={this.props.data}
          options={options}
        />
      </div>
    );
  }
}

export default PieChart;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
