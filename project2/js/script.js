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
            age: 20
        },
        {
            name: "paddy",
            hobby: "food",
            age: 22
        },
        {
            name: "saurav",
            hobby: "cricket",
            age: 22
        }
    ];

    $scope.countries = [



















        {
            name:"UK",
            cities:[
                {name:"London"},
                {name:"Manchester"},
                {name:"Birmingham"}
            ]
        },
        {
            name:"USA",
            cities:[
                {name:"Los Angeles"},
                {name:"Chicago"},
                {name:"New York"}
            ]
        },
        {
            name:"India",
            cities:[
                {name:"Delhi"},
                {name:"Kolkata"},
                {name:"Jhansi"}
            ]
        }
    ];

});