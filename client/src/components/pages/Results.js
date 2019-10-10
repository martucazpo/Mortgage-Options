import React, { Component } from "react";
import LinkList from "../linksList";
import "./Results.css";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import Navbar from "../layout/Navbar";
import Chart from "react-google-charts";
import MortgageCalculator from "mortgage-calculator-react";

const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7] // CSS-style declaration
];

const options = {
  title: "My Daily Activities",
  pieHole: 0.4,
  is3D: false
};

class Results extends Component {
  state = {
    name: "",
    email: "",
    totalPayment: 0,
    downPayment: 0,
    termMonths: 0,
    ListPrice: 0,
    TaxAnnualAmount: 0,
    profileId: "",
    propertyId: [],
    properties: []
  };

  componentDidMount() {
    API.getUser({ email: this.props.match.params.email }).then(res => {
      console.log(res);
      this.setState({
        name: res.data.name,
        email: res.data.email,
        profileId: res.data.profile[0]
      });
    });

    API.getProfile(this.state.profileId)
      .then(res => {
        this.setState(
          {
            downPayment: res.data[0].downPayment,
            totalPayment: res.data[0].totalPayment,
            termMonths: res.data[0].termMonths,
            propertyId: res.data[0].property,
            profileId: res.data[0]._id
          },
          () => {
            API.findPropertyAndPop(this.state.profileId).then(res =>
              this.setState({
                totalPayment: res.data.totalPayment,
                downPayment: res.data.downPayment,
                properties: res.data.property
              })
            );
          }
        );
      })
      .catch(err => console.log(err));
  }
  //  {/* <Navbar /> */}
  renderproperties = () => {
    return this.state.properties.map(property => (
      <div>
        <p>
          {property.ListPrice}
          {property.TaxAnnualAmount}
        </p>
      </div>
    ));
  };
  render() {
    console.log("this is my current state", this.state);
    return (
      <div>
        <Navbar />
        <div className="results">
          <h3>Results</h3>

          {this.renderproperties()}
        </div>

        <div className="row">
          <div className="col s1"></div>
          <div className="col s5 skeleton rbox">
            <div>
              <MortgageCalculator />
            </div>
            <div id="mortgage-calculator-react"></div>
            <script src="https://www.fastforma.com/mortgage-calculator-react.js"></script>
          </div>
          <div className="col s5 skeleton rbox">
            <div className="App">
              <Chart
                chartType="PieChart"
                width="100%"
                height="395px"
                data={data}
                options={options}
              />
            </div>
          </div>
          <div className="col s1"></div>
        </div>
        <div className="row">
          <div className="col s12 links"></div>
          <LinkList />
        </div>
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default withRouter(Results);
