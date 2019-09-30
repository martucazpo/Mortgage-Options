import React, {Component} from 'react';
import API from "../../utils/API";
import LinkList from '../linksList';

let imageArr = [];
let dataArr = [];
//let finalArr = [];
//let dataArrs= [];
//let ListPrice = Number;
//let TaxAnnualAmount = Number;
//let MediaURL = "";


class PropertySearch extends Component{

    state = {
        result :{},
        search :"",
        listPrice : Number,
        TaxAnnualAmount : Number,
        img : ""
    };

    componentDidMount(){
      this.searchProperties()
    }

    searchProperties() {
      API.search()
        .then( res => {for(let j=0;j<res.data.bundle.length;j++){imageArr.push(res.data.bundle[j])}
        return imageArr})
        .then(() => {for(let i=0;i<imageArr.length;i++){dataArr.push({ListPrice: imageArr[i].ListPrice,TaxAnnualAmount:imageArr[i].TaxAnnualAmount,img:imageArr[i].Media})}
        return dataArr})
        .then(console.log(imageArr,dataArr))
        .catch(err => console.log(err))
    }

   /* handleForm() {
      // event.preventDefault();
         API.saveProperty({
           listPrice: this.state.listPrice,
           TaxAnnualAmount: this.state.TaxAnnualAmount,
           img:this.state.img
         })
           .then(console.log("profile saved!"))
           .catch(err => console.log(err));
     };*/


     render(){  
       
        return(
        <div className="propertySearch">
        <h3>PropertySearch</h3>
        <div className="gallery">
        <div className="images">
        </div>
      </div>
        <LinkList/>
        </div>)}

}

export default PropertySearch;