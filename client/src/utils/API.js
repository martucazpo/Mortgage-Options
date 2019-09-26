import axios from "axios";
const BASEURL = "";

export default {
  search: function(query) {
    return axios.get(BASEURL + query );
  },
  getProfilesWithTheirProperties: function(){
    console.log("this is the one that you want, you really want it");
    return axios.post("/api/profiles/" + id);
  },
  // Gets all books
  getProfiles: function() {
    console.log("got");
    return axios.get("/api/profiles");
  },
  getProperties: function() {
    console.log("got");
    return axios.get("/api/properties");
  },
  // Gets the book with the given id
  getProfile: function(id) {
    return axios.get("/api/profiles/" + id);
  },
  getProperty: function(id) {
    return axios.get("/api/properties/" + id);
  },
  // Deletes the book with the given id
  deleteProfile: function(id) {
    return axios.delete("/api/profile/" + id);
  },
  deleteProperty: function(id) {
    return axios.delete("/api/properties/" + id);
  },
  // Saves a book to the database
  saveProfile: function(profileData) {
    console.log('hit');
    return axios.post("/api/profile", profileData);
  },
  saveProperty: function(propertyData) {
    console.log('hit');
    return axios.post("/api/properties", propertyData);
  }
};
