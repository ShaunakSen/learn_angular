var myApp = angular.module("myModule", []);

myApp.controller("myController", function ($scope) {
    var movie;
    movie = {
        name: "Deadpool",
        path: "img/deadpool.jpg"
    };
    $scope.movie = movie;

});