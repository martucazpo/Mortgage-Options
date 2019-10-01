import React, {Component} from 'react';
import API from '../../utils/API';
import ProfileDetail from '../profileDetails';
import { withRouter } from 'react-router-dom'; 


class EditReg extends Component{

  

    
    state={
        name:"",
        email:""
    }

    componentDidMount (){
        API.getProfile(this.props.match.params.id)
        .then( res => {
          console.log('My res',res)
            this.setState({
                name: res.data.name,
                email: res.data.email
            })
        })
        .catch(err => console.log(err))
    }
    handleInputChange = event => {
      console.log("I can handle imput change")
        const { name, value } = event.target;
        this.setState({
          [name]: value
        })
    }


    handleForm = event => {
        event.preventDefault();
        API.updateProfile(this.props.match.params.id, this.state)
            .then(res => console.log("item updated!!!" + res.data))
            .catch(err => console.log(err))
         this.props.history.push('/registration');
      }
    
      render(){
        console.log(this.props)
        return(
            <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.props.name}
          onChange={this.handleInputChange}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          value={this.props.email}
          onChange={this.handleInputChange}
        />
        <ProfileDetail name={this.state.name} email={this.state.email}/>
        <button onClick={this.handleForm}>Submit</button>
      </form>
        )
      }
}

export default withRouter(EditReg);