var myApp = angular.module("myModule", []);


myApp.controller("myController", function ($scope) {
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

    $scope.friendsView = 'friendsTable.html';


});