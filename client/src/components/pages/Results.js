import React, { Component } from "react";
import LinkList from "../linksList";
import "./Results.css";
//import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import Navbar from "../layout/Navbar";
import Chart from "react-google-charts";
import MortgageCalculator from "mortgage-calculator-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const data = [
  ["Task", "Hours per Day"],
  ["Principal & Interest", 11],
  ["Property Tax", 2],
  ["Homeowner's Insurance", 2],
  ["Mortgage Insurance", 2]
  // CSS-style declaration
];

const options = {
  title: "My Monthly Payment",
  pieHole: 0.4,
  is3D: false
};

class Results extends Component {
constructor (props){
super(props);
this. state = {
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
profile: []
  };
}

  componentDidMount() {
    let user = this.props.auth;

    API.getUser(user.user.id)
    .then(res => {
      console.log("toast",res); 
      this.setState({
        name: res.data.name,
        email: res.data.email,
        profileId: res.data.profile[0]
      });
    });

    API.popUser(user.user.id)
    .then(res => {
      console.log("bullfrog",res);
      this.setState({
       // profile: res.data.profile,
        properties: res.data.property,
        downPayment : res.data.profile.downPayment,
        totalPayment : res.data.profile.totalPayment,
        termMonths : res.data.profile.termMonths,
        ListPrice : res.data.property.ListPrice,
        TaxAnnualAmount : res.data.property.TaxAnnualAmount,
        _id: res.data.property._id,
        img : res.data.property.imageArr
      })
    })

    
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
      <div className="resultPage">
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

//export default withRouter(Results);
