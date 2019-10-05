import React, { Component } from "react";
import Form from "../forms";
import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";
import { List, ListItem } from "../List";
import LinkList from "../linksList";
import EditBtn from "../EditBtn";
import { withRouter } from "react-router-dom";
import Navbar from "../layout/Navbar";

import "./Registration.css";

import Calculator from "../Calculator";
import MortgageCalculator from "mortgage-calculator-react";

// const reactElement = (
//   <div>
//     <MortgageCalculator />
//   </div>
// );

class Registration extends Component {
  state = {
    profiles: [],
    // name: "",
    // email: "",
    desiredPayment: "",
    loanTerm: "",
    downPayment: ""
  };

  componentDidMount() {
    this.loadProfile();
    this.findUser();
  }

  findUser = () => {
    API.getUser({ email: this.props.match.params.email })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  loadProfile = () => {
    API.getProfiles()
      .then(res =>
        this.setState({
          profiles: res.data,
          // name: this.state.name,
          // email: this.state.email,
          desiredPayment: this.state.desiredPayment,
          loanTerm: this.state.loanTerm,
          downPayment: this.state.downPayment
        })
      )
      .catch(err => console.log(err));
  };

  deleteProfile = id => {
    API.deleteProfile(id)
      .then(console.log("profile deleted"))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, prevent the default event and alert the username and password
  handleForm = () => {
    // event.preventDefault();
    API.saveProfile({
      // name: this.state.name,
      // email: this.state.email,
      desiredPayment: this.state.desiredPayment,
      loanTerm: this.state.loanTerm,
      downPayment: this.state.downPayment
    })
      .then(console.log("profile saved!"))
      .catch(err => console.log(err));
  };

  render() {
    console.log("My state", this.state);
    return (
      <div className="formDiv">
        <LinkList />
        <Form handleForm={this.handleForm} />
        <List>
          {this.state.profiles.map(profile => (
            <ListItem key={profile._id}>
              <strong>
                {/* <div>{profile.name}</div>
                <div>{profile.email}</div> */}
                <div>{profile.downPayment}</div>
                <div>{profile.loanTerm}</div>
                <div>{profile.desiredPayment}</div>
              </strong>

              <Calculator
                desired={profile.desiredPayment}
                loanTerm={profile.loanTerm}
                down={profile.downPayment}
                rate={0.01052}
              />

              <EditBtn id={profile._id} />
              <DeleteBtn onClick={() => this.deleteProfile(profile._id)} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withRouter(Registration);
