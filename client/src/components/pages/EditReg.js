import React, { Component } from "react";
import API from "../../utils/API";
import ProfileDetail from "../profileDetails";
import { withRouter } from "react-router-dom";

class EditReg extends Component {
  state = {
    totalPayment: "",
    termMonths: "",
    downPayment: ""
  };

  componentDidMount() {
    API.getProfile(this.props.match.params.id)
      .then(res => {
        console.log("My res", res);
        this.setState({
          totalPayment: res.data.totalPayment,
          termMonths: res.data.termMonths,
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
          type="text"
          placeholder="Desired Payment Amount"
          name="totalPayment"
          value={this.state.totalPayment}
          onChange={this.handleInputChange}
        />
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
        </select>
        <input
          type="text"
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
