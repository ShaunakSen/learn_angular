var myApp  = angular.module('myApp',['ngRoute']);


myApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'pages/mini.html',
            controller:'mainController'
        })
        .when('/shona/:num',{
            templateUrl:'pages/shona.html',
            controller:'secondController'
        })
        .when('/shona/',{
            templateUrl:'pages/shona.html',
            controller:'secondController'
        })
});

myApp.controller('mainController',['$scope','$log','$location',function($scope,$log,$location){
    console.log($location.path());
    $scope.name = "MINI";
}]);

myApp.controller('secondController',['$scope','$log','$routeParams',function($scope,$log,$routeParams){
    $scope.name="SHONA";
    $scope.num = $routeParams.num || 1;
}]);
