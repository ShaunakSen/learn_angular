var myApp = angular.module('myApp', ['ngRoute']);


myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'index3.html',
            controller: 'mainController'
        })
        .when('/second', {
            templateUrl: 'index3_second.html',
            controller: 'secondController'
        });
});

myApp.directive("searchResult", function () {
    return {
        restrict: 'AEM',
        templateUrl: 'directives/searchresult.html',
        replace: true,
        scope: {
            //personName: "@",
            //personAddress: "@",
            personObject: "=",
            formattedAddressFunction: "&"
        }
    };
});

myApp.controller('mainController', ['$scope', '$log', '$location', function ($scope, $log, $location) {
    $scope.person = {
        name: 'Buddhu Mini',
        address: '3/1 Badabazar',
        city: 'Jhansi',
        state: 'UP',
        zip: '284002'
    };
    $scope.formattedAddress = function (person) {
        return person.name + " Lives in " + person.address + " which is in " + person.city + " in " + person.state + " " + person.zip;
    };

}]);

myApp.controller('secondController', ['$scope', '$log', '$routeParams', 'nameService', function ($scope, $log, $routeParams, nameService) {

}]);


