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
        .when(
        "/students/:id", {
            templateUrl: "templates/studentDetails.html",
            controller: "studentDetailsController"
        })
        .otherwise({
            redirectTo: "/home"
        });
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
        .then(function (response) {
            $scope.students = response.data;
            console.log($scope.students);
        });
});

myApp.controller("studentDetailsController", function ($scope, $http, $routeParams) {
    $http({
        url: "http://localhost/series/webservice/webservice.php",
        params: {id: $routeParams.id},
        method: "get"
    })
        .then(function (response) {
            $scope.student = response.data;
            console.log($scope.student);
        })
});

