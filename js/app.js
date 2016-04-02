/**
 * Created by root on 2/4/16.
 */
var myApp  = angular.module('myApp',[]);
myApp.controller('mainController', function($scope, $log){
    $scope.name="Mini Sen";
    $scope.eats = "chocolates";
    $scope.getName = function()
    {
        return this.name;
    };
    console.log($log);
    console.log($scope.getName());
    console.log($scope);
});