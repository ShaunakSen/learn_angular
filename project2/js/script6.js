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
        .when(
        "/studentsSearch/:name?", {
            templateUrl: "templates/studentsSearch.html",
            controller: "studentsSearchController as studentsSearchCtrl"
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

myApp.controller("studentsController", function ($scope, $http, $route, $location) {
    var vm = this;

    vm.searchStudent = function(){
        if(vm.name){
            $location.url("/studentsSearch/" + vm.name);
        }
        else{
            $location.url("/studentsSearch/");
        }
    };

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

myApp.controller("studentsSearchController", function ($http, $routeParams) {
    var vm = this;

    if($routeParams.name){
        $http({
            url: "http://localhost/series/webservice/webservice4.php",
            params: {name: $routeParams.name},
            method: "get"
        })
            .then(function (response) {
                vm.students = response.data;
                console.log(vm.student);
            })
    }
    else{
        $http({
            url: "http://localhost/series/webservice/webservice4.php",
            method: "get"
        })
            .then(function (response) {
                vm.students = response.data;
                console.log(vm.student);
            })
    }


});

