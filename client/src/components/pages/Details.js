import React, {Component} from 'react';
import LinkList from '../linksList';

class Details extends Component{

    render(){
    return(
    <div className="details">
    <h3>Details</h3>
    <LinkList/>
    </div>
            );
    }
}

export default Details;