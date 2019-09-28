import React, { Component } from "react";
import ProfileDetail from "../profileDetails"
import API from "../../utils/API";

class Form extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    name: "",
    email: ""
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
        name: this.state.name,
        email: this.state.email
      })
        .then(console.log("profile saved!"))
        .catch(err => console.log(err));
  };

  render(){
    return (
      <form>
        <input
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
        />
        <ProfileDetail name={this.state.name} email={this.state.email}/>
        <button onClick={this.handleForm}>Submit</button>
      </form>
    );
  }
}

export default Form;
