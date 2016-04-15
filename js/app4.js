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

myApp.service('nameService',function(){
    var self = this;
    this.name="Mini Sen";
    this.namelength = function(){
        return self.name.length;
    }
});

myApp.controller('mainController',['$scope','$log','$location','nameService',function($scope,$log,$location,nameService){
    console.log($location.path());
    $scope.$watch('name',function(){
        nameService.name = $scope.name;
        //remember nameService is a singleton...In this controller we set value of nameService.name so in the second page also this value is called
    });
    $log.log(nameService.name);
    $log.log(nameService.namelength());
}]);

myApp.controller('secondController',['$scope','$log','$routeParams','nameService',function($scope,$log,$routeParams,nameService){
    $scope.name=nameService.name;
    $scope.num = $routeParams.num || 1;
    $log.log(nameService.name);
    $log.log(nameService.namelength());
}]);
