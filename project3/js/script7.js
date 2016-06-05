var myApp = angular.module("myModule", []);

myApp.controller('cityController', function(){
    this.name = "Kolkata";
});
myApp.controller('stateController', function(){
    this.name = "West Bengal";
});
myApp.controller('countryController', function(){
    this.name = "India";
});