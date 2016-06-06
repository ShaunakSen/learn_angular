var myApp = angular.module("myModule", ["ui.router"]);
myApp.config(function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
    //$locationProvider.html5Mode(true);
    //$routeProvider.caseInsensitiveMatch = true;

    $urlRouterProvider.otherwise("/home");
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: "homeController",
            controllerAs: "homeCtrl",
            data: {
                customData1: "Home State Custom Data 1",
                customData2: "Home State Custom Data 2"
            }
        })
        .state("courses", {
            url: "/courses",
            templateUrl: "templates/courses.html",
            controller: "coursesController as coursesCtrl",
            data: {
                customData1: "Courses State Custom Data 1",
                customData2: "Courses State Custom Data 2"
            }
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

});


myApp.controller("homeController", function ($state) {
    this.message = "Home Page";
    this.homeCustomData1 = $state.current.data.customData1;
    this.homeCustomData2 = $state.current.data.customData2;
    this.coursesCustomData1 = $state.get('courses').data.customData1;
    this.coursesCustomData2 = $state.get('courses').data.customData2;
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

