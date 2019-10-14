import React, { Component } from "react";
import PieChart from "../Charts/index";
import customStyle from "./CustomStyle.css";
import API from "../../utils/API";
import Navbar from "../layout/Navbar";
//import Chart from "react-google-charts";
import Footer from "../layout/Footer";
//import ReactDOM from "react-dom";
import MortgageCalculator from "../../utils/mortgagecalculator/src/MortgageCalculator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

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
  constructor(props) {
    super(props);
    this.state = {
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
      monthlyInsurance: 5,
      data: []
    };
    this.renderproperties = this.renderproperties.bind(this);
    this.popCalc = this.popCalc.bind(this);
    this.handleLocationReload = this.handleLocationReload.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderData = this.renderData.bind(this);
  }

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

        totalPayment: res.data.profile[0].totalPayment,
        downPayment: res.data.profile[0].downPayment,
        termMonths: res.data.profile[0].termMonths,
        savedProp: res.data.property,
        // ListPrice: res.data.ListPrice,
        //TaxAnnualAmount: res.data.property.TaxAnnualAmount,
        id: res.data.property._id,
        img: res.data.property.imageArr
      });
    });
  }
  //  {/* <Navbar /> */}
  renderproperties = () => {
    return this.state.savedProp.map(property => (
      <div key={property._id}>
        <div className="col s3">
          <div className="card z-depth-3">
            <div className="card-image">
              <img src={property.img} alt={""} />
              <span className="card-title"></span>
              <button
                onClick={() => this.deleteProperty(property._id)}
                className="btn-floating pulse halfway-fab waves-effect waves-light blue"
              >
                <i className="material-icons">clear</i>
              </button>
            </div>
            <div class="card-context">
              <br></br>
              <button
                onClick={() => this.popCalc(property._id)}
                className="btn z-depth-3 waves-effect waves-light hoverable black seePropButton"
              >
                See Property
              </button>
            </div>
          </div>
        </div>
        {/* <p>{property.ListPrice}</p> */}
        {/* <button
          onClick={() => this.deleteProperty(property._id)}
          className="btn-floating pulse halfway-fab waves-effect waves-light blue"
        >
          <i className="material-icons">clear</i>
        </button> */}
      </div>
    ));
  };
  deleteProperty = id => {
    let user = this.props.auth;
    console.log("delete id", id);
    API.deleteProperty(id)
      .then(console.log("property deleted"))
      .catch(err => console.log(err));
    this.handleLocationReload();
  };
  handleLocationReload = () => {
    window.location.reload();
  };
  popCalc = id => {
    API.getProperty(id).then(res => {
      console.log("pigeon", res);
      this.setState(
        {
          ListPrice: res.data.ListPrice,
          TaxAnnualAmount: res.data.TaxAnnualAmount
        },
        () => {
          this.renderData();
          return this.state;
        }
      );
    });
  };

  renderData = () => {
    let data = [
      ["TotalCost", "Type of Cost"],
      ["List Price", this.state.ListPrice],
      ["Down Payment", this.state.downPayment],


      ["Annual Tax", this.state.TaxAnnualAmount] // CSS-style declaration
    ];


    return this.setState({ data });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleLocationReload = () => {
    window.location.reload();
  };

  render() {
    console.log("this is my current state", this.state);
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col s1"></div>
          <div className="col s10 propChoices">
            <h3>Your Saved Homes.</h3>

            {this.renderproperties()}
          </div>
          <div className="col s1"></div>
        </div>

        <div className="row resultRow">
          <div className="col s1"></div>
          <div className="col s5 rbox">
            <div>
              <MortgageCalculator
                styles={customStyle}
                showPaymentSchedule
                totalPrice={this.state.ListPrice}
                downPayment={this.state.downPayment}
                interestRate={0.04}
                months={360}
                additionalPrincipalPayment={""}
                taxRate={0.01}
                insuranceRate={0.01}
                mortgageInsuranceEnabled={false}
              />
            </div>
          </div>
          <div className="col s1"></div>
          <div className="col s4 rbox">
            <div className="App">
              <PieChart data={this.state.data} />
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
