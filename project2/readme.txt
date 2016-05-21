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

    What happens if controller name is misspelled??
    1. data binding wont occur
    2. we will get an error msg sure but it wont be readable. it points to a url. Soln: use uncompressed
       version of angular

    What happens if a property name in the binding expr is misspelled?
    -- no error it wont simply show up

  When u use binding expr with img source attr u get 404 error

    <img src="{{movie.path}}" height="200" width="200" alt="{{movie.name + 'poster'}}"/>
    this is bcoz initially when DOM loads it send request toload img in path {{movie.path}} which is not valid
    later when a 2nd request is made after binding expr is evaluated we see the img
    To solve this we use ng-src.. only 1 proper request will be made here.. no 404 error. no same request made twice
____________________________________________________________________________________________________________________

2 way Data binding
--Keeps model and view in sync at all times. ANy change in one is reflected in the other
  $scope.message ="ok"  {{message}} -> changes the view on basis of model. Other way round?
  ng-model updates model when view changes
  ng-model can be used with: input, select, textarea

 ng-repeat : use $index to find index of item.. use $parent.$index to access parent indices
 UK index = 0
     London         index = 0 parentIndex=0
     Manchester     index = 0 parentIndex=1
     Birmingham     index = 0 parentIndex=2
 USA index = 1
     Los Angeles    index = 1 parentIndex=0
     Chicago        index = 1 parentIndex=1
     New York       index = 1 parentIndex=2
 India index = 2
     Delhi          index = 2 parentIndex=0
     Kolkata        index = 2 parentIndex=1
     Jhansi         index = 2 parentIndex=2



 FILTERS in Angular

 They can do 3 things:format, sort and filter data
  {{expression | filterName:parameter}}
  Format: lowercase, uppercase, number, currency, date
  limitTo filter: limits the no of rows or chars in a string
  {{expression | limitTo: limit : begin(optional)}}

  orderBy Filter : To Sort data
  {{orderBy_expr | orderBy: expression : reverse(optional)}}
  eg: <tr ng-repeat="friend in friends | limitTo: rowLimit | orderBy: 'name' : true">
  OR
      <tr ng-repeat="friend in friends | limitTo: rowLimit | orderBy: '-name' ">


  For searching in angular.. Search across all properties is easy
  Search across single property is also easy
  We want to search across say 2 properties. Then we need to write custom function