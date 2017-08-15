var express = require('express');
var Promise = require('bluebird');
var models = require('./models');
var router = express.Router();

module.exports = router

var Hotel = models.Hotel
var Restaurant = models.Restaurant
var Activity = models.Activity
var Place = models.Place




router.get('/api', function(req,res,next) {
  var allAttractions = {};

  Hotel.findAll()
  .then(function(hotels) {
    allAttractions.hotels = hotels;
    return Restaurant.findAll();
  })
  .then(function(restaurants) {
    allAttractions.restaurants = restaurants;
    return Activity.findAll();
  })
  .then(function(activities) {
    allAttractions.activities = activities;
    return Place.findAll();
  })
  .then(function(places) {
    allAttractions.places = places;
  })
  .then(function() {
    res.json(allAttractions);
  })
  .catch(next);
})
