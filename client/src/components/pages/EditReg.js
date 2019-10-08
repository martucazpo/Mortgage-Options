import React, { Component } from "react";
import API from "../../utils/API";
import ProfileDetail from "../profileDetails";
import { withRouter } from "react-router-dom";

class EditReg extends Component {
  state = {
    desiredPayment: "",
    loanTerm: "",
    downPayment: ""
  };

  componentDidMount() {
    API.getProfile(this.props.match.params.id)
      .then(res => {
        console.log("My res", res);
        this.setState({
          desiredPayment: res.data.desiredPayment,
          loanTerm: res.data.loanTerm,
          downPayment: res.data.downPayment
        });
      })
      .catch(err => console.log(err));
  }
  handleInputChange = event => {
    console.log("I can handle imput change");
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleForm = event => {
    event.preventDefault();
    API.updateProfile(this.props.match.params.id, this.state)
      .then(res => console.log("item updated!!!" + res.data))
      .catch(err => console.log(err));
    this.props.history.push("/registration");
  };

  render() {
    console.log(this.props);
    return (
      <form>
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
        <ProfileDetail name={this.state.name} email={this.state.email} />
        <button onClick={this.handleForm}>Submit</button>
      </form>
    );
  }
}

export default withRouter(EditReg);
