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
            personName: "@",
            personAddress: "@"
        }
    };
});

myApp.controller('mainController', ['$scope', '$log', '$location', function ($scope, $log, $location) {
    $scope.person = {
        name: 'Buddhu Mini',
        address: '3/1 Badabazar Jhansi 284002'
    };

}]);

myApp.controller('secondController', ['$scope', '$log', '$routeParams', 'nameService', function ($scope, $log, $routeParams, nameService) {

}]);


