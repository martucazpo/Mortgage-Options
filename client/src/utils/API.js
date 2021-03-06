import axios from "axios";
//let apiKey = process.env.REACT_APP_REAL_ESTATE_KEY;
let BASEURL =
  "https://api.bridgedataoutput.com/api/v2/test_sd/listings?access_token=d3bbe72d694abf78a8395471bb912049" 
  

export default {
  search: function() {
    return axios.get(BASEURL);
  },
  findPropertyAndPop: function(id) {
    console.log("popcorn");
    return axios.get("/api/properties/tester/" + id);
  },
  getProfiles: function() {
    return axios.get("/api/profiles");
  },
  getProperties: function() {
    return axios.get("/api/properties");
  },
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the book with the given id
  getProfile: function(id) {
    return axios.get("/api/profiles/" + id);
  },
  getProperty: function(id) {
    console.log("are you here?");
    return axios.get("/api/properties/proper/" + id);
  },
  populateProperty: function(profileId) {
    return axios.get("/api/profiles/" + profileId);
  },
  getUser: function(id) {
    console.log("USER");
    return axios.get("/api/users/" + id);
  },
  updateUser: function(id) {
    console.log("user updated");
    return axios.get("/api/users/" + id);
  },
  popUser: function(id) {
    console.log("I called the ferret!");
    return axios.get("/api/users/pop/" + id);
  },
  populateProps: function() {
    return axios.get("/api/users/test");
  },
  updateProfile: function(id, info) {
    return axios.put("/api/profiles/" + id, info);
  },
  deleteProfile: function(id) {
    return axios.delete("/api/profiles/" + id);
  },
  deleteProperty: function(id) {
    "Is anybody home?";
    return axios.delete("/api/properties/proper/" + id);
  },
  // Saves a book to the database
  saveProfile: function(profileData) {
    return axios.post("/api/profiles", profileData);
  },
  saveProperty: function(propertyData) {
    return axios.post("/api/properties/", propertyData);
  }
};
