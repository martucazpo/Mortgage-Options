import React, {Component} from 'react';
import Form from "../forms";
import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";
import {List, ListItem} from "../List";

class Registration extends Component{

    state =  {
      profiles:[],
        name : "",
        email : ""
    };

    componentDidMount() {
        this.loadProfile();
    }
    
    loadProfile = () => {
    API.getProfiles()
    .then(res =>
    this.setState({ profiles: res.data, 
    name: this.state.name,
    email: this.state.email
    })
    )
    .catch(err => console.log(err))
    }
    
    deleteProfile = id => {
        API.deleteProfile(id)
          .then(res => this.loadProfiles())
          .catch(err => console.log(err));
    };
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };


    render(){
    
        return(
          <div className="formDiv">
          <Form/>
         <List>
          {this.state.profiles.map(profile => (
          <ListItem key={profile._id}>
          <strong>
          {profile.name}{profile.email}
          </strong>
          <DeleteBtn onClick={() => this.deleteProfile(profile._id)} />
          </ListItem>
          ))}
          </List>
          </div>
        );

    }
  };

export default Registration;