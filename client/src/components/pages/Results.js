import React, { Component } from "react";
// import LinkList from "../linksList";
// import "./Results.css";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";
import Navbar from "../layout/Navbar";

class Results extends Component {
  state = {
    name: "",
    email: "",
    desiredPayment: 0,
    downPayment: 0,
    ListPrice: 0,
    TaxAnnualAmount: 0,
    profileId: "",
    propertyId: []
  };

  componentDidMount() {
    API.getUser({ email: this.props.match.params.email })
      .then(res => {
        console.log(res);
        this.setState({
          name: res.data.name,
          email: res.data.email,
          profileId: res.data.profile[0]
        });
      })
      .catch(err => console.log(err));

    API.getProfile(this.state.profileId)
      .then(res => {
        console.log(res);
        this.setState({
          downPayment: res.data[0].downPayment,
          desiredPayment: res.data[0].desiredPayment,
          propertyId: res.data[0].property
        });
      })
      .catch(err => console.log(err));

    API.getProperty(this.state.propertyId)
      .then(res => {
        console.log(res);
        this.setState({
          ListPrice: res.data.ListPrice,
          TaxAnnualAmount: res.data.TaxAnnualAmount
        });
      })
      .catch(err => console.log(err));
  }
  //  {/* <Navbar /> */}

  render() {
    console.log(this.state);
    return (
      <div>
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
          <div className="col s12 links"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(Results);
// {/* <LinkList /> */}
