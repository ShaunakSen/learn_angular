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


  ng-init
  --allows us to evaluate an expr in the current scope. But u should use controller to initialize values
   on the scope
   ng-init should only be used for aliasing special properties in ng-repeat directive

   ng-include
   --used to embed an HTML page in another HTML page, when we want to reuse a specific view in multiple pages


  SERVICES

  http service
  --used to make http requests to a remote server
  http service returns a promise objects. This means that it is executed asynchronously and data returned
  by it may not be available immediately. so:
  $scope.mini = $http.get(url) // this is not possible
  so we use then method

  $http.get('http://localhost/series/webservice/webservice.php')
          .then(function(response){
              $scope.friends = response.data;
              console.log($scope.friends);
          });

  What exactly does this response object contain?
    Object {data: Array[4], status: 200, config: Object, statusText: "OK"}


  When all the code is within the controller function it can become slightly complex
  Also if we want to reuse the logic within any other controller we would have to duplicate the code within that
  controller. So use services
  Service is built using app.factory() method. The function inside the method returns a javaScript object


  $location Service
  --$location.hash(scrollLocation);
    it appends #scrollLocation to the URL

  $anchorScroll
  -- it reads that hashed fragment and automatically scrolls to that element


  Building an SPA

  --this app will have clean urls
  index.html is the layout view. It contains header, footer and main content area. Depending on url
  that user requests, views will be injected into layout view
  for eg if someone goes to base_url/student, then student.html will be injected into layouts view

  In index.html
      <li><a href="#/home">Home</a></li>
      <li><a href="#/courses">Courses</a></li>
      <li><a href="#/students">Students</a></li>
  In body
  <ng-view>
  // This is where the views will be injected
  </ng-view>

  Now we want to create partial templates
  templates
  -> home.html
  -> courses.html
  -> students.html

  Now in home.html we want to have a controller homeController which will be responsible for home view
  So <h2>{{message}}</h2> This is where the title of the page would go

  Similarly for courses
  <h2>Courses We Offer</h2>
  <ul>
      <li ng-repeat="course in courses"></li>
  </ul>
  This courses property will be set be courseController

  For students, i want the list of students to come from a database table using a webservice
  <h2>Our students</h2>
  <ul>
      <li ng-repeat="student in students">
          {{student.name}}
      </li>
  </ul>

  Now configure routes:
  myApp.config(function ($routeProvider) {
      $routeProvider
          .when(
          "/home", {
              templateUrl: "templates/home.html",
              controller: "homeController"
          })
          .when(
          "/courses", {
              templateUrl: "templates/courses.html",
              controller: "coursesController"
          })
          .when(
          "/students", {
              templateUrl: "templates/students.html",
              controller: "studentsController"
          })
  });

  Coding the controllers:

  myApp.controller("homeController", function ($scope) {
      $scope.message = "Home Page"
  });

  myApp.controller("coursesController", function ($scope) {
      $scope.courses = ["Meteor", "React & Redux", "Angular", "Django", "Laravel"];
  });

  myApp.controller("studentsController", function ($scope, $http) {
      $http.get("http://localhost/series/webservice/webservice.php")
          .then(function(response){
              $scope.students = response.data;
          });
  });

  But this is how our routes look like now:
  http://localhost:63342/learn_angular/project2/index6.html#/home

  How to remove the '#'

  There are 3 steps:
  1. Enable html5mode routing
  Inject $locationProvider to config and do:
  $locationProvider.html5Mode(true);

  2. Remove #/ from all links

  3.<base href="/learn_angular/project2/" />


  Adding few more Functionalities
  we want each student in the list to be links.
  when we click on them it should display info about that student
  We do this by using id of student
  1st change view
  <h2>Our Students</h2>
  <ul class="list-group">
      <li ng-repeat="student in students" class="list-group-item list-group-item-success">
          <a href="students/{{student.id}}">{{student.name}}</a>
      </li>
  </ul>

  Now add route
  .when(
          "/students/:id", {
              templateUrl: "templates/studentDetails.html",
              controller: "studentDetailsController"
          })

  Create the partial template studentDetails.html

  Creating controller:

  myApp.controller("studentDetailsController", function ($scope, $http, $routeParams) {
      $http({
          url: "http://localhost/series/webservice/webservice.php",
          params: {id: $routeParams.id},
          method: "get"
      })
          .then(function (response) {
              $scope.student = response.data;
              console.log($scope.student);
          })
  });


  Creating View:

  <div class="panel panel-info">
      <div class="panel-body">
          <p>Id : {{student[0].id}}</p>
          <p>Name: {{student[0].name}}</p>
          <p>city: {{student[0].city}}</p>
          <p>hobby: {{student[0].hobby}}</p>
      </div>

  </div>
  <a href="students">Back to students list</a>


  CONTROLLER AS Syntax
  So far we have used $scope to display stuff in view. There is another way: CONTROLLER AS Syntax
  Using CONTROLLER AS Syntax there is no need to inject $scope object in controller function

  Controller with $scope

  app.controller("mainController", function($scope)){
  $scope.message = "Mini";
  }
  <div ng-controller="mainController">{{message}}</div>

  Controller AS Syntax

    app.controller("mainController", function()){
    this.message = "Mini";
    }
    <div ng-controller="mainController as main">{{main.message}}</div>


  Basically we create an instance of the controller and attach properties to it

  When we have code like:

  myApp.controller("studentsController", function ($http) {

      $http.get("http://localhost/series/webservice/webservice.php")
          .then(function (response) {
              this.students = response.data;
          });
  });

  In then() this points to window object. To solve this :

  myApp.controller("studentsController", function ($http) {
      var vm = this;
      $http.get("http://localhost/series/webservice/webservice.php")
          .then(function (response) {
              vm.students = response.data;
              });
  });

  Nested Scopes and Controller AS Syntax

  Say we have:

  myApp.controller('cityController', function($scope){
      $scope.name = "Kolkata";
  });
  myApp.controller('stateController', function($scope){
      $scope.name = "West Bengal";
  });
  myApp.controller('countryController', function($scope){
      $scope.name = "India";
  });

  we want to display:
  India
  West Bengal
  Kolkata

  HTML:

  <div ng-controller="countryController">
      {{name}}
      <div ng-controller="stateController">
          {{name}}
          <div ng-controller="cityController">
              {{name}}
          </div>
      </div>
  </div>


  Now suppose we want to display:
  India
  India - West Bengal
  India - West Bengal - Kolkata

  <div ng-controller="countryController">
      {{name}}
      <div ng-controller="stateController">
          {{$parent.name}} - {{name}}
          <div ng-controller="cityController">
              {{$parent.$parent.name}} - {{$parent.name}} - {{name}}
          </div>
      </div>
  </div>

  This is quite confusing. Imagine how complex it would be with deeper levels of nesting

  Using Controller AS Syntax:

  myApp.controller('cityController', function(){
      this.name = "Kolkata";
  });
  myApp.controller('stateController', function(){
      this.name = "West Bengal";
  });
  myApp.controller('countryController', function(){
      this.name = "India";
  });


  HTML:

  <div ng-controller="countryController as countryCtrl">
      {{countryCtrl.name}}
      <div ng-controller="stateController as stateCtrl">
          {{countryCtrl.name}} - {{stateCtrl.name}}
          <div ng-controller="cityController as cityCtrl">
              {{countryCtrl.name}} - {{stateCtrl.name}} - {{cityCtrl.name}}
          </div>
      </div>
  </div>

  This is much cleaner!!

  But does this mean $scope is not used at all? No
  Angular uses $scope behind the scenes
  for eg: <div ng-controller="cityController as cityCtrl">
  This cityCtrl is attached to $scope object


  To make routes case insensitive add:

  caseInsensitiveMatch: true to the particular route

  If u want this for all routes :
  $routeProvider.caseInsensitiveMatch: true

  Inline Templates:
  .when(
          "/home", {
              templateUrl: "templates/home.html",
              controller: "homeController as homeCtrl"
          })

  View content coming from separate HTML file. It can be inline as well

  .when(
            "/home", {
                template: "<h2>Hiii Mini</h2>",
                controller: "homeController as homeCtrl"
            })



  Route Reload:

  Now in our SPA we had a list of students
  we add a student to database. on clicking student this does not get updated. Only on
  reloading does this get updated
  But on reloading obviously every single thing will have to be fetched from server, Instead of just reloading
  resources for that particular route

  Create a new function in studentsController called reloadData
  vm.reloadData = function(){
          $route.reload()
      };

  In View students.html:
  <button class="btn btn-primary" ng-click="studentsCtrl.reloadData()">Refresh</button>

  It will just reload the route not everything else


  Diff b/w $scope and $rootScope:

  $rootScope is is available globally for all controllers. $scope is available only to controller
  which has created it and its children


  Cancel Route Change:
  In view where we display name of students we want to add a confirmation alert when user wants to navigate away.
  This is particularly useful in case of long forms and u have filled out 90% of the form when u accidentally click
  on another link

  $scope.$on('$routeChangeStart',function(event, next, current){
          if(!confirm("Are you sure you want to navigate away")){
              event.preventDefault();
          }
      });

      next contains info about next route we are navigating to
      next contains info about current route we are on

      If i want to know which route user is navigating to, i have to make use of next

      console.log(next) to see the properties associated with it
      next.$$route.originalPath

      Similarly we can use $locationChangeStart event. This is exactly same but next property and current r diff

      $scope.$on('$locationChangeStart',function(event, next, current){
              if(!confirm("Are you sure you want to navigate away to " + next)){
                  console.log(next);
                  event.preventDefault();
              }



      Route Change Events:

      1.$locationChangeStart
      2.$routeChangeStart
      3.$locationChangeSuccess
      4.$routeChangeSuccess



      Now we want to have a search box above our student list
      If i type the letters mi and hits search it should display to me info about mini

      we create webservice4.php to return data from database(using LIKE SQL)

      In studentsController we build a function called searchStudent
      Also we inject a service called $location

      Basically we want to check whether anyone has typed anything into input field and hit search
      in view:

      <div class="form-group">
          <input type="text" class="form-control" ng-model="studentCtrl.name"/>
          <button class="btn btn-default" ng-click="studentCtrl.searchStudent">Search</button>
      </div>

      In controller:
      vm.searchStudents = function(){
              if(vm.name){

                //if user has typed anything
                  $location.url("/studentsSearch/" + vm.name);
              }
              else{
                  $location.url("/studentsSearch/");
              }
          };

      For this studentsSearch we build a controller


      myApp.controller("studentsSearchController", function ($http, $routeParams) {
          var vm = this;

          if($routeParams.name){
              $http({
                  url: "http://localhost/series/webservice/webservice4.php",
                  params: {name: $routeParams.name},
                  method: "get"
              })
                  .then(function (response) {
                      vm.students = response.data;
                      console.log(vm.student);
                  })
          }
          else{
              $http({
                  url: "http://localhost/series/webservice/webservice4.php",
                  method: "get"
              })
                  .then(function (response) {
                      vm.students = response.data;
                      console.log(vm.student);
                  })
          }


      });

      If name property is set we send in a name parameter to request. this is the case when user
      types something into text field
      If not we dont send params

      Next we have to configure this route

      .when(
              "/studentsSearch/:name?", {
                  templateUrl: "templates/studentsSearch.html",
                  controller: "studentsSearchController as studentsSearchCtrl"
              })

      We want name param to be optional so we include ? after it


      We have to build this view now

      <ul class="list-group" ng-repeat="student in studentsSearchCtrl.students">
          <li class="list-group-item">{{student.id}}</li>
          <li class="list-group-item">{{student.name}}</li>
          <li class="list-group-item">{{student.hobby}}</li>
          <li class="list-group-item">{{student.city}}</li>
      </ul>



ROUTE RESOLVE

result of http.get might take time. We want route not to change until
result od $http.get is available


suppose we dont want route to change when user goes to students view until the
students are fetched from db
We dont want to transition to new route until all promises are resolved


.when(
        "/students", {
            templateUrl: "templates/students.html",
            controller: "studentsController as studentsCtrl",
            resolve: {
                studentsList: function($http){
                    return $http.get("http://localhost/series/webservice/webservice.php")
                        .then(function (response) {
                            return response.data;
                        });
                }
            }
        })


Before we transition to a new route we will have students list in property studentsList
This means we can now inject this property into students controller

We dont need $http inside controller anymore

myApp.controller("studentsController", function (studentsList, $scope, $route, $location) {
    var vm = this;

    vm.searchStudent = function(){
        if(vm.name){
            $location.url("/studentsSearch/" + vm.name);
        }
        else{
            $location.url("/studentsSearch/");
        }
    };

    vm.reloadData = function(){
        $route.reload()
    };
    vm.students = studentsList;
});

How to test this?

dont start ur php server

try to go to students view
Nothing will happen! route will not change



UI ROUTER


ui router is third party routing module
It implements routing based on state of application
ngRoute implemented routing based on route url

3 steps to include ui router
1.add CDN link
2.add ui.router as module dependency
3.add ui-view directive in layout page


Now we will work in project3

Instead of referencing ng-route we refer ui router cdn

add ui.router as module dependency

var myApp = angular.module("myModule", ["ui.router"]);

In view:

<div class="col-xs-12">
    <ui-view></ui-view>
</div>

Configuring states

A state is a place in the application.. analogous to route in ngRoute

to configure a state use state method of $stateProvider service

Currently we were using $routProvider service to configure routes
this $routProvider came with ngRoute
we can no longer use that
We have to use $stateProvider service

Modifying states:

$stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: "homeController",
            controllerAs: "homeCtrl"
        })

'home' is name of state

Similarly we do for all routes

We comment out otherwise route and routes with params for now

Next see in controller studentsController
we have used $rote.reload..but $route is service of ngRoute
Instead inject $state service and use $state.reload()

next in index instead of <a href="">
use <a ui-sref="name of the state">

From ui-sref angular understands the state
This state has properties like

.state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            controller: "homeController",
            controllerAs: "homeCtrl"
        })


So it does all required stuff


what if we remove url property?

Then what will happen?
Firstly the links wont be hyperlinks

Then since templateUrl and all are specified when we click home, info in home template will be displayed
controller will be loaded
but url wont change

Also RELOAD PROBLEM SOLVED in ui-router


How to use url parameters with ui router?


When we click on student  name it should display info of that student

In view students.html we have:
<a href="students/{{student.id}}">{{student.name}}</a>

when we click on student name its id is passed

But we dont have route configured for that

Let us configure url params

1. Define state with url param:

.state("studentDetails", {
            url:"/students/:id",
            templateUrl: "templates/studentDetails.html",
            controller: "studentDetailsController as studentDetailsCtrl"
        });

studentDetails is name of state

2.
In view students.html

<a ui-sref="studentDetails({id:student.id})">{{student.name}}</a>

here studentDetails is name of state and id is parameter


3.
controller for studentDetails state: studentDetailsController

This is the controller:

myApp.controller("studentDetailsController", function ($http, $routeParams) {
 var vm = this;
 $http({
 url: "http://localhost/series/webservice/webservice.php",
 params: {id: $routeParams.id},
 method: "get"
 })
 .then(function (response) {
 vm.student = response.data;
 console.log(vm.student);
 })
 });

 Here we are using $routeParams service.. we cant anymore

 to read param values we need $stateParams service

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

  Using optional parameters with ui router

  with ngRoute to make a parameter optional we include ? at end of route

  Here in ui router parameters are optional by default

  We wanna implement the same search functionality as we had in project 2

  if input text field is empty we dont wanna pass anything through url parameters and
  in view we wanna display all student names

  Configure url:


  .state("studentsSearch",{
              url: "/studentsSearch/:name",
              templateUrl: "templates/studentsSearch.html",
              controller: "studentsSearchController as studentsSearchCtrl"
          });



  Now look at our view... Where search button is present we have:

  <input type="text" class="form-control" ng-model="studentsCtrl.name"/>
  <br/>
  <button class="btn btn-default" ng-click="studentsCtrl.searchStudent()">Search</button>

  This searchStudent function is placed in studentsController

  myApp.controller("studentsController", function (studentsList, $scope, $state, $location) {
      var vm = this;

      vm.searchStudent = function () {
          if (vm.name) {
              $location.url("/studentsSearch/" + vm.name);
          }
          else {
              $location.url("/studentsSearch/");
          }
      };

      vm.reloadData = function () {
          $state.reload()
      };
      vm.students = studentsList;
  });


  We dont want to use location service.. We are already injecting $state service.. We want to use that

  We modify searchStudent function as:
  vm.searchStudent = function () {
          $state.go('studentsSearch',{name: vm.name});
      };

  We are activating the state studentsSearch and passing param vm.name


  Finally we have to change studentsSearchController



