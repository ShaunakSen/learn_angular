var myApp = angular.module("myModule", []);


myApp.controller("myController", function ($scope, $location, $http, $anchorScroll) {
    $scope.scrollTo = function (scrollLocation) {
        $location.hash(scrollLocation);
        $anchorScroll();
    };
    $http.get("http://localhost/series/webservice/webservice2.php").then(function (response) {
        //console.log(response.data);
        $scope.countries = response.data;
        $http.get("http://localhost/series/webservice/webservice3.php").then(function (response) {
            //console.log(response.data);
            $scope.cities = response.data;
            console.log($scope.countries);
            console.log($scope.cities);
            for (var i = 0; i < $scope.countries.length; ++i) {
                $scope.countries[i].city = [];
                var countryId = $scope.countries[i].id;
                for (var k = 0; k < $scope.cities.length; ++k) {
                    if ($scope.cities[k].country_id == countryId) {
                        $scope.countries[i].city.push($scope.cities[k].name);
                    }
                }
            }
            console.log($scope.countries);
        });
    });


});
