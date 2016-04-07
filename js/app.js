/**
 * Created by root on 2/4/16.
 */
var myApp  = angular.module('myApp',['ngMessages','ngResource']);
myApp.controller('mainController', function($scope, $log, $filter,$resource){
    $scope.name="Mini Sen";
    $scope.eats = "chocolates";
    $scope.getName = function()
    {
        return this.name;
    };
    console.log($log);
    //console.log($scope.getName());
    //console.log($scope);
    $scope.formattedName = $filter('uppercase')($scope.name);
    $log.info($scope.formattedName);
    $log.info($resource);


});
var searchPeople = function searchPeople($scope,fName,lName,ht,age){
    return 'MINI MINI';
};
var searchPeopleString = searchPeople.toString();

console.log(searchPeopleString);
//returns the entire function as a string

console.log(angular.injector().annotate(searchPeople));
