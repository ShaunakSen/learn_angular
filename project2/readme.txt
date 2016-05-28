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








