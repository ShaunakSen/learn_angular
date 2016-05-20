WHAT IS MODULE

-- container for diff parts of ur app
 its like main() method
 it wires together diff parts of app

 var myApp = angular.module("myModule",[**dependencies go here**])

 WHAT IS CONTROLLER

 -- it is a js constructor function. job of controller is to build a model for the view to display
    model is the data

    var myController = function($scope){
    $scope.message = "Hi mini"
    }
     this message property is attached to scope object so it will be available to the view
