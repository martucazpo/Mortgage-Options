import React, { Component } from "react";
import API from "../../utils/API";
import ProfileDetail from "../profileDetails";
//import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class EditReg extends Component {
  state = {
    // name: "",
    // email: this.props.email,

    desiredPayment: "",
    loanTerm: "",
    name: "",
    email: "",
    id : "",
    profileId : "",
    totalPayment: "",
    termMonths: "",
    downPayment: ""
  };

  componentDidMount(){
    let user = this.props.auth;
    API.popUser(user.user.id)
    .then(res => {
      console.log("Edit?",res); 
      this.setState({
        name : res.data.name,
        email : res.data.email,
        id : res.data._id,
        profileId : res.data.profile[0]._id,
        loanTerm : res.data.profile[0].loanTerm,
        totalPayment: res.data.profile[0].totalPayment,
        termMonths : res.data.profile[0].termMonths,
        downPayment : res.data.profile[0].termMonths
      })
  })
   
  }


  // componentDidMount() {
  //   API.getProfile(this.props.match.params.id)
  //     .then(res => {
  //       console.log("My res", res);
  //       this.setState({
  //         totalPayment: res.data.totalPayment,
  //         termMonths: res.data.termMonths,
  //         downPayment: res.data.downPayment
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }
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
    API.updateProfile(this.state.profileId,{
      loanTerm:this.state.loanTerm,
      downPayment:this.state.downPayment,
      totalPayment:this.state.totalPayment
    })
      .then(res => console.log("item updated!!!",res))
      .catch(err => console.log(err));
    
    API.updateUser(user.user.id)
    .then(res => console.log("user updated",res))
    .catch(err => console.log(err));

    API.popUser(user.user.id)
    .then(res => {
      console.log("have I changed?",res); 
      this.setState({
        name : res.data.name,
        email : res.data.email,
        id : res.data._id,
        profileId : res.data.profile[0]._id,
        loanTerm : res.data.profile[0].loanTerm,
        totalPayment: res.data.profile[0].totalPayment,
        termMonths : res.data.profile[0].termMonths,
        downPayment : res.data.profile[0].termMonths
      })
  })

    this.props.history.push("/registration");
  };

  render() {
    console.log("Arizona",this.state);
    console.log("Profile ID",this.state.profileId)
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
