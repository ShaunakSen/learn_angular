var myApp = angular.module("myModule", []);

myApp.controller("myController", function($scope){
    var employee;
    $scope.message = "Hi mini";

    employee = {
        firsname: "mini",
        lastname: "sen",
        gender: "F"
    };

    $scope.employee = employee;

});