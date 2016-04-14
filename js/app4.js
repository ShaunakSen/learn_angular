var myApp  = angular.module('myApp',['ngRoute']);


myApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'pages/mini.html',
            controller:'mainController'
        })
        .when('/shona',{
            templateUrl:'pages/shona.html',
            controller:'secondController'
        })
});

myApp.controller('mainController',['$scope','$log','$location',function($scope,$log,$location){
    console.log($location.path());
    $scope.name = "MINI";
}]);

myApp.controller('secondController',['$scope','$log',function($scope,$log){
    $scope.name="SHONA";
}]);
