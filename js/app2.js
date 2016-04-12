
var myApp  = angular.module('myApp',['ngMessages','ngResource']);

myApp.controller('mainController',['$scope','$log','$timeout','$filter',function($scope,$log,$timeout,$filter){
    $log.info('HI... New Controller!!!');
    $scope.name = "Mini Sen";
    $timeout(function () {
     $scope.name = "Mini And Shona";
    },3000);
    $scope.handle="";
    $scope.lowercasehandle=function(){
        return $filter('lowercase')($scope.handle);
    };
    $scope.$watch("handle",function(newValue, oldValue){
        console.info("handle changed");
        console.info("old value: " + oldValue);
        console.info("new value: " + newValue);
    });
    setTimeout(function(){
        $scope.$apply(function(){
            $scope.handle = "myNewTwitterHandle";
            console.log("scope changed");
        })},3000);


}]);



