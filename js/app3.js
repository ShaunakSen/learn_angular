var myApp  = angular.module('myApp',['ngMessages','ngResource']);

myApp.controller('mainController',['$scope','$log','$timeout','$filter',function($scope,$log,$timeout,$filter){
    $scope.handle = ""
    $scope.characters = 5;
    var display_message= function(){
        return $scope.handle.length === 5;
    };
    $scope.rules = [
        {ruleName: "Must be 5 characters"},
        {ruleName: "Must not exist elsewhere"},
        {ruleName: "Must be cool"}
    ];


}]);
