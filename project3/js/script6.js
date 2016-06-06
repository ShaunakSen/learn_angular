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
            url: "/students/:id",
            templateUrl: "templates/studentDetails.html",
            controller: "studentDetailsController as studentDetailsCtrl"
        })
        .state("studentsSearch", {
            url: "/studentsSearch/:name",
            templateUrl: "templates/studentsSearch.html",
            controller: "studentsSearchController as studentsSearchCtrl"
        });
    /*.otherwise({
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
        $state.go('studentsSearch', {name: vm.name});
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


myApp.controller("studentsSearchController", function ($http, $stateParams) {
    var vm = this;
    if ($stateParams.name) {
        //if user has typed something
        $http({
            url: "http://localhost/series/webservice/webservice4.php",
            method: "get",
            params: {name: $stateParams.name}
        }).then(function (response) {
            vm.students = response.data;
        })
    } else {
        $http({
            url: "http://localhost/series/webservice/webservice4.php",
            method: "get"
        }).then(function (response) {
            vm.students = response.data;
        })
    }

});

