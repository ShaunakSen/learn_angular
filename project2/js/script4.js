var myApp = angular.module("myModule", []);


myApp.controller("myController", function ($scope, $http, $log) {

    var successCallback = function (response) {
        $scope.friends = response.data;
    };
    var errorCallback = function (response) {
        $scope.error = response.data;
    };

    $http.get('http://localhost/series/webservice/webservice.php')
        .then(successCallback, errorCallback);
});