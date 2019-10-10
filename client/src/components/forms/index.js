import React, { Component } from "react";
import ProfileDetail from "../profileDetails";
import API from "../../utils/API";
import { withRouter } from "react-router-dom";

// const options = ["one", "two", "three"];

class Form extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    // name: "",
    // email: this.props.email,
    desiredPayment: "",
    loanTerm: "",
    downPayment: "",
    name: "",
    email: "",
    id : ""
  };

  componentDidMount(){
    API.getUser(sessionStorage.getItem('username'))
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
    
    API.saveProfile({
      // name: this.state.name
      // email:this.props.email,
      id : this.state.id,
      desiredPayment: this.state.desiredPayment,
      downPayment: this.state.downPayment,
      loanTerm: this.state.loanTerm
    })
    //  API.popUser(this.props.id)
    //    .then(console.log("populated res"))
    //   .catch(err => console.log(err));
    // this.handleLocationReload();
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
          type="desiredPayment"
          placeholder="Desired Payment Amount"
          name="desiredPayment"
          value={this.state.desiredPayment}
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
          <option value="" disabled >
            Loan Term
          </option>
          <option value="360">30 years</option>
          <option value="240">20 years</option>
          <option value="180">15 years</option>
          <option value="120">10 years</option>
          <option value="60">5 years</option>
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
          desiredPayment={this.state.desiredPayment}
          loanTerm={this.state.loanTerm}
          downPayment={this.state.downPayment}
        />
        <button onClick={this.handleForm}>Submit</button>
      </form>
    );
  }
}

export default withRouter(Form);
