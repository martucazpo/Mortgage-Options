
const db = require("../models");


// Defining methods for the booksController
module.exports = {
  findAllProfiles: function(req, res) {
    db.Profile
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllProperties: function(req, res) {
    db.Property
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllUsers: function(req, res) {
    db.User
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findProfileById: function(req, res) {
    console.log("req.params.id");
    db.Profile
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findPropertyById: function(req, res) {
    db.Property
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUserById: function(req, res) {
    console.log("req.params.email");
    db.User
      .findOne(req.params.email)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createProfile: function(req, res) {
    console.log('hit create profile')
    console.log(req.body);
    db.Profile
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createProperty: function(req, res) {
    console.log('hit create property')
    console.log(req.body);
    db.Property
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createUser: function(req, res) {
    console.log('hit create user')
    console.log(req.body);
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateProfile: function(req, res) {
    console.log(req.params.id, req.body);
    db.Profile
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateProperty: function(req, res) {
    db.Property
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeProfile: function(req, res) {
    db.Profile
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeProperty: function(req, res) {
    db.Property
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  populateProfile: function(req, res){
    db.Profile
    .findOne({_id: req.params.id})
    .populate("property")
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
};