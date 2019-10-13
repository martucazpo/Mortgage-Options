import React, { Component } from "react";
import API from "../../utils/API";
import ProfileDetail from "../profileDetails";
//import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import "./EditReg.css";

class EditReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desiredPayment: 0,
      loanTerm: 0,
      name: "",
      email: "",
      id: "",
      profileId: "",
      totalPayment: 0,
      termMonths: 0,
      downPayment: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  componentDidMount() {
    let user = this.props.auth;
    API.popUser(user.user.id).then(res => {
      console.log("Edit?", res);
      this.setState({
        name: res.data.name,
        email: res.data.email,
        id: res.data._id,
        profileId: res.data.profile[0]._id,
        loanTerm: res.data.profile[0].loanTerm,
        totalPayment: res.data.profile[0].totalPayment,
        termMonths: res.data.profile[0].termMonths,
        downPayment: res.data.profile[0].termMonths
      });
    });
  }

  handleInputChange = event => {
    console.log("I can handle imput change");
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleForm = event => {
    let user = this.props.auth;
    event.preventDefault();
    API.updateProfile(this.state.profileId, {
      loanTerm: this.state.loanTerm,
      downPayment: this.state.downPayment,
      totalPayment: this.state.totalPayment,
      termMonths: this.state.termMonths
    })
      .then(res => console.log("item updated!!!", res))
      .catch(err => console.log(err));

    API.updateUser(user.user.id)
      .then(res => console.log("user updated", res))
      .catch(err => console.log(err));

    API.popUser(user.user.id).then(res => {
      console.log("have I changed?", res);
      this.setState({
        name: res.data.name,
        email: res.data.email,
        id: res.data._id,
        profileId: res.data.profile[0]._id,
        loanTerm: res.data.profile[0].loanTerm,
        totalPayment: res.data.profile[0].totalPayment,
        termMonths: res.data.profile[0].termMonths,
        downPayment: res.data.profile[0].termMonths
      });
    });

    this.props.history.push("/registration");
  };

  render() {
    console.log("Arizona", this.state);
    console.log("Profile ID", this.state.profileId);
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col s4"></div>
          <div className="col s4 editInfoBox">
            <form>
              <div className="editForms">
                <label>Desired Payment Amount</label>
                <input
                  type="text"
                  // placeholder="Desired Payment Amount"
                  name="totalPayment"
                  value={this.state.totalPayment}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="editForms">
                <label>Amortize your Loan</label>
                <select
                  value={this.state.termMonths}
                  name="loanTerm"
                  className="browser-default"
                  onChange={this.handleInputChange}
                >
                  <option value="" disabled>
                    Loan Term
                  </option>
                  <option value="360">30 Years</option>
                  <option value="240">20 Years</option>
                  <option value="180">15 Years</option>
                  <option value="120">10 Years</option>
                  <option value="60">5 Years</option>
                </select>
              </div>
              <div className="editForms">
                <label>Down Payment</label>
                <input
                  className="editForms"
                  type="text"
                  // placeholder="Down Payment"
                  name="downPayment"
                  value={this.state.downPayment}
                  onChange={this.handleInputChange}
                />
              </div>
              <ProfileDetail name={this.state.name} email={this.state.email} />
              <button
                className="btn btn-large waves-effect waves-light hoverable black editSubButton"
                onClick={this.handleForm}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="col s4"></div>
        </div>
        <Footer />
      </div>
    );
  }
}

EditReg.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(EditReg);

//export default withRouter(EditReg);
