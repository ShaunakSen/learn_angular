var myApp = angular.module("myModule", []);

myApp.filter('restriction', function () {
    return function (gender) {
        if (gender < 22) {
            return 'not allowed';
        }
        else
            return 'allowed';
    }
});

myApp.controller("myController", function ($scope) {
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

    $scope.search = function (item) {
        if ($scope.searchText2 == undefined) {
            return true;
        }
        else {
            if ((item.name.toLowerCase().indexOf($scope.searchText2.toLowerCase()) != -1) ||
                (item.hobby.toLowerCase().indexOf($scope.searchText2.toLowerCase()) != -1)) {
                return true;
            }
        }
        return false;
    }
});