var myApp = angular.module("myModule", ["ngRoute"]);
myApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.caseInsensitiveMatch = true;
    $routeProvider
        .when(
        "/home", {
            templateUrl: "templates/home.html",
            controller: "homeController as homeCtrl"
        })
        .when(
        "/courses", {
            templateUrl: "templates/courses.html",
            controller: "coursesController as coursesCtrl"
        })
        .when(
        "/students", {
            templateUrl: "templates/students.html",
            controller: "studentsController as studentsCtrl"
        })
        .when(
        "/students/:id", {
            templateUrl: "templates/studentDetails.html",
            controller: "studentDetailsController as studentDetailsCtrl"
        })
        .otherwise({
            redirectTo: "/home"
        });

});


myApp.controller("homeController", function () {
    this.message = "Home Page"
});

myApp.controller("coursesController", function () {
    this.courses = ["Meteor", "React & Redux", "Angular", "Django", "Laravel"];
});

myApp.controller("studentsController", function ($http, $route) {
    var vm = this;
    vm.reloadData = function(){
        $route.reload()
    };
    $http.get("http://localhost/series/webservice/webservice.php")
        .then(function (response) {
            vm.students = response.data;
            console.log(vm.students);
        });
});

myApp.controller("studentDetailsController", function ($http, $routeParams) {
    var vm = this;
    $http({
        url: "http://localhost/series/webservice/webservice.php",
        params: {id: $routeParams.id},
        method: "get"
    })
        .then(function (response) {
            vm.student = response.data;
            console.log(vm.student);
        })
});

