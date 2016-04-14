var myApp  = angular.module('myApp',['ngMessages','ngResource']);

myApp.controller('mainController',['$scope','$log','$timeout','$filter','$http',function($scope,$log,$timeout,$filter,$http){
    $scope.handle = "";
    $scope.characters = 5;


    //native javascript ajax
    /*
    var rulesrequest = new XMLHttpRequest();
    rulesrequest.onreadystatechange= function () {
        $scope.$apply(function(){
            if(rulesrequest.readyState==4 && rulesrequest.status==200){
                console.log(JSON.parse(rulesrequest.responseText));
                $scope.rules=JSON.parse(rulesrequest.responseText);
            }
        });


    };
    rulesrequest.open("GET","https://api.myjson.com/bins/3ay8z",true);
    rulesrequest.send();
    */

    $http.get('https://api.myjson.com/bins/3ay8z')
        .success(function(result){
            $scope.rules=result;
        })
        .error(function (data,status) {
            console.log(status);
        });
}]);
