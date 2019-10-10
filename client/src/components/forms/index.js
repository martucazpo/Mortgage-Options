import React, { Component } from "react";
import ProfileDetail from "../profileDetails";
import API from "../../utils/API";
import { withRouter } from "react-router-dom";
import materialize from "materialize-css";
import ReactDOM from "react-dom";

// const options = ["one", "two", "three"];

class Form extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    // name: "",
    // email: this.props.email,
    totalPayment: "",
    termMonths: "",
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

  handleForm = event => {
    console.log("HELLO");
    event.preventDefault();
    API.saveProfile({
      // name: this.state.name
      // email:this.props.email,
      totalPayment: this.state.totalPayment,
      downPayment: this.state.downPayment,
      termMonths: this.state.loanTerm
    });
    API.populateProps({ email: this.props.match.params.email })
      .then(() => {
        this.props.history.push("/property");
      })
      .catch(err => console.log(err));
    // this.handleLocationReload();
  };

  handleLocationReload = () => {
    window.location.reload();
  };

  render() {
    console.log(this.state);
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
          type="totalPayment"
          placeholder="Desired Payment Amount"
          name="totalPayment"
          value={this.state.totalPayment}
          onChange={this.handleInputChange}
        />
        {/* <div style={{ margin: "20px" }}>
          <Dropdown
            options={options}
            onChange={this._onSelect}
            value={options}
            placeholder="Select an option"

            // type="loanTerm"
            // placeholder="Desired Loan Term"
            // name="loanTerm"
            // value={this.state.loanTerm}
            // onChange={this.handleInputChange}
          />
        </div> */}

        <label>Amortize your Loan</label>
        <select class="browser-default">
          <option value="" disabled selected>
            Loan Term
          </option>
          <option value="360">30 Years</option>
          <option value="240">20 Years</option>
          <option value="180">15 Years</option>
          <option value="120">10 Years</option>
          <option value="60">5 Years</option>
          value={this.state.termMonths}
          onChange={this.handleInputChange}
        </select>
        <br></br>
        <input
          type="downPayment"
          placeholder="Down Payment"
          name="downPayment"
          value={this.state.downPayment}
          onChange={this.handleInputChange}
        />
        <ProfileDetail
          desiredPayment={this.state.totalPayment}
          loanTerm={this.state.termMonths}
          downPayment={this.state.downPayment}
        />
        <button onClick={this.handleForm}>Submit</button>
      </form>
    );
  }
}

export default withRouter(Form);
