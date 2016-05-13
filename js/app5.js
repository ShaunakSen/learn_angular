var myApp  = angular.module('myApp',['ngRoute']);


myApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'index3.html',
            controller:'mainController'
        })
        .when('/second',{
            templateUrl:'index3_second.html',
            controller:'secondController'
        });
});

myApp.controller('mainController',['$scope','$log','$location','nameService',function($scope,$log,$location,nameService){

}]);

myApp.controller('secondController',['$scope','$log','$routeParams','nameService',function($scope,$log,$routeParams,nameService){

}]);

myApp.directive("searchResult",function(){
    return {
        restrict: 'AECM',
        template: '<a href="#" class="list-group-item">' +
        '<h4 class="list-group-item-heading">Shaunak Sen</h4>' +
        '<p class="list-group-item-text">89 Dum Dum Park</p> ' +
        '</a>',
        replace: true
    };
});
