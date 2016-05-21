var myApp = angular.module("myModule", []);

myApp.controller("myController", function ($scope) {
    var movie;
    movie = {
        name: "Deadpool",
        path: "img/deadpool.jpg"
    };
    $scope.movie = movie;
    $scope.friends = [
        {
            name: "mini",
            hobby: "clothes",
            age: 20,
            dateOfBirth: new Date("November 16, 1994"),
            salary: 2000000.777
        },
        {
            name: "paddy",
            hobby: "food",
            age: 22,
            dateOfBirth: new Date("November 26, 1994"),
            salary: 1900000.777
        },
        {
            name: "saurav",
            hobby: "cricket",
            age: 22,
            dateOfBirth: new Date("February 16, 1994"),
            salary: 1800000.777
        },
        {
            name: "suarj",
            hobby: "roaming",
            age: 20,
            dateOfBirth: new Date("March 8, 1994"),
            salary: 1700000.777
        }
    ];
    $scope.rowLimit = 2;
    $scope.sortColumn = "name";
    $scope.reverseSort = false;
    $scope.sortData = function(column){
        $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
        $scope.sortColumn = column;
    };
    $scope.getSortClass = function(column){
        if($scope.sortColumn == column){
            return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        }
        return '';
    };

    $scope.countries = [
        {
            name: "UK",
            cities: [
                {name: "London"},
                {name: "Manchester"},
                {name: "Birmingham"}
            ]
        },
        {
            name: "USA",
            cities: [
                {name: "Los Angeles"},
                {name: "Chicago"},
                {name: "New York"}
            ]
        },
        {
            name: "India",
            cities: [
                {name: "Delhi"},
                {name: "Kolkata"},
                {name: "Jhansi"}
            ]
        }
    ];

    $scope.technologies = [
        {name:'angular', likes:0, dislikes:0},
        {name:'meteor', likes:0, dislikes:0},
        {name:'laravel', likes:0, dislikes:0},
        {name:'node', likes:0, dislikes:0},
        {name:'react', likes:0, dislikes:0},
        {name:'mongo', likes:0, dislikes:0}
    ];

    $scope.increaseLikes = function(technology){
        technology.likes++;
    };
    $scope.increaseDislikes = function(technology){
        technology.dislikes++;
    };


});