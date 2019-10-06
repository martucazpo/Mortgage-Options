import React, { Component } from "react";
import Form from "../forms";
import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";
import { List, ListItem } from "../List";
import LinkList from "../linksList";
import EditBtn from "../EditBtn";
import { withRouter } from 'react-router-dom';


import "./Registration.css";

//import Calculator from "../Calculator";

class Registration extends Component {
  state = {
    profiles: [],
    name: "",
    email: "",
    desiredPayment: 0,
    downPayment: 0
  };

  componentDidMount() {
    API.getUser({email:this.props.match.params.email})
    .then(res => {
      console.log(res); 
      this.setState({
        name : res.data.name,
        email : res.data.email
      })
    })
    .catch(err => console.log(err))
    this.loadProfile();

  }

  loadProfile = () => {
    API.getProfiles()
      .then(res =>
        this.setState({
          profiles: res.data,
          // name: this.state.name,
          // email: this.state.email,
          desiredPayment: this.state.desiredPayment,
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

//  // When the form is submitted, prevent the default event and alert the username and password
//   handleForm = (event) => {
//     console.log("HELLO")
//     event.preventDefault();
//     API.saveProfile({
//     // name: this.state.name
//     //   email:this.state.email,
//       desiredPayment: this.state.desiredPayment,
//        downPayment: this.state.downPayment
//      })
//     API.populateProps({email:this.props.match.params.email})
//        .then(console.log("populated"))
//        .catch(err => console.log(err));
//   };

  render() {
    //console.log(this.state)
    return (
      <div>
        <div className="row">
          <div className="col s2"></div>
          <div className="col s8 skeleton regBox">
            <div className="formDiv">
              <Form email={this.state.email}/>
              <List>
                <ListItem key={this.state.name}>
                <div>
                    <strong>
                      <div>{this.state.name}</div>
                      <div>{this.state.email}</div>
                    </strong>   
                 <div>
                  {this.state.profiles.map(profile=>(
                    <div key={profile._id}>
                      <strong>
                        <div>{profile.desiredPayment}</div>
                        <div>{profile.downPayment}</div>
                      </strong>
                    <EditBtn id={profile._id} />
                    <DeleteBtn onClick={() => this.deleteProfile(profile._id)}/>
                    </div>
                  ))}
                  </div>
                    </div>
                    </ListItem>
                    </List>
            </div>
          </div>
        </div>
      <div className="col s2"></div>
      <div className="row">
        <div className="col s12 links">
            <LinkList />
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(Registration);
