var myApp = angular.module("myModule", ["ui.router"]);
myApp.config(function ($stateProvider) {
    //$locationProvider.html5Mode(true);
    //$routeProvider.caseInsensitiveMatch = true;

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: "homeController",
            controllerAs: "homeCtrl"
        })
        .state("courses", {
            url: "/courses",
            templateUrl: "templates/courses.html",
            controller: "coursesController as coursesCtrl"
        })
        .state("students", {
            url: "/students",
            templateUrl: "templates/students.html",
            controller: "studentsController as studentsCtrl",
            resolve: {
                studentsList: function ($http) {
                    return $http.get("http://localhost/series/webservice/webservice.php")
                        .then(function (response) {
                            return response.data;
                        });
                }
            }
        })
        .state("studentDetails", {
            url:"/students/:id",
            templateUrl: "templates/studentDetails.html",
            controller: "studentDetailsController as studentDetailsCtrl"
        });
    /*.when(
     "/studentsSearch/:name?", {
     templateUrl: "templates/studentsSearch.html",
     controller: "studentsSearchController as studentsSearchCtrl",
     resolve: {
     studentsSearched: function($http, $routeParams){
     if($routeParams.name){
     return $http({
     url: "http://localhost/series/webservice/webservice4.php",
     params: {name: $routeParams.name},
     method: "get"
     })
     .then(function (response) {
     return response.data;
     })
     }
     else{
     return $http({
     url: "http://localhost/series/webservice/webservice4.php",
     method: "get"
     })
     .then(function (response) {
     return response.data;
     })
     }
     }
     }
     })
     .otherwise({
     redirectTo: "/home"
     });*/

});


myApp.controller("homeController", function () {
    this.message = "Home Page"
});

myApp.controller("coursesController", function () {
    this.courses = ["Meteor", "React & Redux", "Angular", "Django", "Laravel"];
});

myApp.controller("studentsController", function (studentsList, $scope, $state, $location) {
    var vm = this;

    vm.searchStudent = function () {
        if (vm.name) {
            $location.url("/studentsSearch/" + vm.name);
        }
        else {
            $location.url("/studentsSearch/");
        }
    };

    vm.reloadData = function () {
        $state.reload()
    };
    vm.students = studentsList;
});

myApp.controller("studentDetailsController", function ($http, $stateParams) {
 var vm = this;
 $http({
 url: "http://localhost/series/webservice/webservice.php",
 params: {id: $stateParams.id},
 method: "get"
 })
 .then(function (response) {
 vm.student = response.data;
 console.log(vm.student);
 })
 });


/*
 myApp.controller("studentsSearchController", function ($http, $routeParams, studentsSearched) {
 var vm = this;

 vm.students = studentsSearched;


 });*/

