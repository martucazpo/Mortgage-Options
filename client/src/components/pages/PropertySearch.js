import React, {Component} from 'react';
import API from "../../utils/API";

class PropertySearch extends Component{

    state = {
        result : {},
        search : ""
    };

    searchProperties = () => {
      API.search()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };
        
     render(){   
        return(
        <div className="propertySearch">
        <h3>PropertySearch</h3>
        <button onClick={this.searchProperties} className="btn btn-primary">
          Search
        </button>
        </div>)}

}

export default PropertySearch;