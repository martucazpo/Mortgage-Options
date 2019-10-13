import React, { Component } from "react";
import PieChart from "../Charts/index"
import customStyle from "./CustomStyle.css";
import API from "../../utils/API";
import Navbar from "../layout/Navbar";
import Chart from "react-google-charts";
import Footer from "../layout/Footer";
//import ReactDOM from "react-dom";
import MortgageCalculator from "../../utils/mortgagecalculator/src/MortgageCalculator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"

// const data = [
//   // ["Mortgage", "Payment Breakdown"],
//   // ["Principal & Interest"],
//   ["Property Tax", 2],
//   ["Homeowner's Insurance", 2],
//   ["Mortgage Insurance", 2]
// ];

// const options = {
//   title: "My Monthly Payment",
//   pieHole: 0.4,
//   is3D: false
// };

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
    properties: [],
    savedProp: [],
    principleAndInterest: 11,
    monthlyTax: 7,
    monthlyInsurance: 5
  };

  componentDidMount() {
    let user = this.props.auth;
    console.log(user.user.id);
    API.getUser(user.user.id).then(res => {
      console.log("toast", res);
      this.setState({
        name: res.data.name,
        email: res.data.email,
        profileId: res.data.profile[0]
      });
    });

    API.popUser(user.user.id).then(res => {
      console.log("bullfrog", res);
      this.setState({
        savedProp: res.data.property,
        ListPrice: res.data.ListPrice,
        TaxAnnualAmount: res.data.property.TaxAnnualAmount,
        id: res.data.property._id,
        img: res.data.property.imageArr
      });
    });
  }
  //  {/* <Navbar /> */}
  renderproperties = () => {
    return this.state.savedProp.map(property => (
      <div key={property._id}>
         <p>{property.ListPrice}</p>
          <img style={{height:"100px",width:"auto"}}src={property.img} alt={""}/>
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

        <div className="row resultRow">
          <div className="col s1"></div>
          <div className="col s5 rbox">
            <div>
              <MortgageCalculator
                styles={customStyle}
                showPaymentSchedule
                price={""}
                downPayment={""}
                interestRate={""}
                months={""}
                additionalPrincipalPayment={""}
                taxRate={0.01}
                insuranceRate={0.01}
                mortgageInsuranceEnabled={false}
              />
            </div>
          </div>
          <div className="col s1"></div>
          <div className="col s5 rbox">
            <div className="App">
            <PieChart
principleAndInterest = {this.state.principleAndInterest}
monthlyTax={this.state.monthlyTax}
monthlyInsurance={this.state.monthlyInsurance}
/>        
            </div>
          </div>
          <div className="col s1"></div>
        </div>
        <Footer />
      </div>
    );
  }
}

Results.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Results);

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

