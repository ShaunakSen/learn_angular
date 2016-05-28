var myApp = angular.module("myModule", ["ngRoute"]);
myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when(
        "/home", {
            templateUrl: "templates/home.html",
            controller: "homeController"
        })
        .when(
        "/courses", {
            templateUrl: "templates/courses.html",
            controller: "coursesController"
        })
        .when(
        "/students", {
            templateUrl: "templates/students.html",
            controller: "studentsController"
        })
    $locationProvider.html5Mode(true);
});


myApp.controller("homeController", function ($scope) {
    $scope.message = "Home Page"
});

myApp.controller("coursesController", function ($scope) {
    $scope.courses = ["Meteor", "React & Redux", "Angular", "Django", "Laravel"];
});

myApp.controller("studentsController", function ($scope, $http) {
    $http.get("http://localhost/series/webservice/webservice.php")
        .then(function(response){
            $scope.students = response.data;
        });
});

