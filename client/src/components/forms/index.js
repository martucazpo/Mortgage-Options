import React, { Component } from "react";
import ProfileDetail from "../profileDetails";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import { withRouter } from "react-router-dom";

// import materialize from "materialize-css";
// import ReactDOM from "react-dom";

// const options = ["one", "two", "three"];

class Form extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    // name: "",
    // email: this.props.email,

    desiredPayment: "",
    loanTerm: "",
    name: "",
    email: "",
    id : "",
    totalPayment: "",
    termMonths: "",
    downPayment: ""
  };

  componentDidMount(){
    let user = this.props.auth;
    API.getUser(user.user.id)
    .then(res => {


      console.log("LKDJF:LSD")
      console.log("ID?",res); 
      this.setState({
        name : res.data.name,
        email : res.data.email,
        id : res.data._id,
        profileId : res.data.profile[0]})
  })
   
  }

  // handle any changes to the input fields
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  }

  handleForm = event => {
    console.log("HELLO");
    event.preventDefault();
    let user = this.props.auth;
    
    API.saveProfile({
      // name: this.state.name
      // email:this.props.email,

      id : this.state.id,
      desiredPayment: this.state.desiredPayment,
      downPayment: this.state.downPayment,
      loanTerm: this.state.loanTerm,
      totalPayment: this.state.totalPayment,
      termMonths: this.state.loanTerm
    })
    .catch(err => console.log (err))
    API.popUser(user.user.id)
      .then(() => {
        console.log("rabbits")
        this.props.history.push("/registration");
      })
      .catc99999999999999999999999999999999999999999999999999969h(err => console.log(err));

     //this.handleLocationReload();
  }





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
        <select className="browser-default">
          <option value="" disabled>
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

Form.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Form);
//export default withRouter(Form);
