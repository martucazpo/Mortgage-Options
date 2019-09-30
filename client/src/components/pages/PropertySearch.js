import React, {Component} from 'react';
import API from "../../utils/API";
import LinkList from '../linksList';

let imageArr = [];
let dataArr = [];
//let dataArrs= [];
//let ListPrice = Number;
//let TaxAnnualAmount = Number;
//let MediaURL = "";


class PropertySearch extends Component{

    state = {
        result :{},
        search :"",
        dataArrs:[],
        dataArr:[]
    };

    componentDidMount(){
      this.searchProperties()
    }

    renderImage(dataArr) {
      return (
        <div>
          <img src={dataArr} alt="realestateImages" />
        </div>
      );
    }

    searchProperties = () => {
      API.search()
        .then( res => {for(let j=0;j<res.data.bundle.length;j++){imageArr.push(res.data.bundle[j])}
        return imageArr})
        .then(() => {for(let i = 0; i < imageArr.length; i++){dataArr.push(imageArr[i].ListPrice,imageArr[i].TaxAnnualAmount,imageArr[i].Media[i])}
        return dataArr})
        .then(console.log(imageArr,dataArr))
        .catch(err => console.log(err));
    };
     render(){  
       
        return(
        <div className="propertySearch">
        <h3>PropertySearch</h3>
        <div className="gallery">
        <div className="images">
        {this.state.dataArrs.map(dataArr => this.renderImage(dataArr))}
        </div>
      </div>
        <LinkList/>
        <button onClick={this.searchProperties} className="btn btn-primary">
          Search
        </button>
        </div>)}

}

export default PropertySearch;