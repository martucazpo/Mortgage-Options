import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
class EditBtn extends Component {
 render(){
   return(
     <Link to={"/registration/"+this.props.id}><button type="button">Edit</button></Link>
   )
 }
}

export default EditBtn;