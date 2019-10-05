import React, { Component } from "react";
import ProfileDetail from "../profileDetails";
import API from "../../utils/API";

class Form extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    // name: "",
    // email: "",
    desiredPayment: "",
    loanTerm: "",
    downPayment: ""
  };

  // handle any changes to the input fields
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
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
    return (
      <form>
        {/* <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          value={this.state.email}
          onChange={this.handleInputChange}
        /> */}
        <input
          type="desiredPayment"
          placeholder="Desired Payment Amount"
          name="desiredPayment"
          value={this.state.desiredPayment}
          onChange={this.handleInputChange}
        />
        <input
          type="loanTerm"
          placeholder="Desired Loan Term"
          name="loanTerm"
          value={this.state.loanTerm}
          onChange={this.handleInputChange}
        />
        <input
          type="downPayment"
          placeholder="Down Payment"
          name="downPayment"
          value={this.state.downPayment}
          onChange={this.handleInputChange}
        />
        <ProfileDetail
          desiredPayment={this.state.desiredPayment}
          loanTerm={this.state.loanTerm}
          downPayment={this.state.downPayment}
        />
        <button onClick={this.handleForm}>Submit</button>
      </form>
    );
  }
}

export default Form;
