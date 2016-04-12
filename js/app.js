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



