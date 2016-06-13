<div class="row row-content" ng-controller="menuController as menuCtrl">

menuController as menuCtrl means when i refer to HTML code inside this div i can use it with the
alias menuCtrl

Making 1st app.. see menu.html

basically we have tabs.. Appetizers desserts ...
on clicking we want to filter


Each tab has unique index. set this index

<a href="#home" aria-controls="all menu" role="tab" data-toggle="tab" ng-click="menuCtrl.select(1)">All Menu</a>

this.select = function(setTab){
    this.tab = setTab;
}

so tab var is being set

Now on basis of that we have to give active class to tab being selected

<li role="presentation" ng-class="{active:menuCtrl.isSelected(1)}">

this.isSelected = function(checkTab){
    return (this.tab === checkTab);
};



Now to filter data:


<li class="media" ng-repeat="dish in menuCtrl.dishes | filter: menuCtrl.filtText">

the elements will be filtered on basis of filtText

If filtText == ""  no filtering occurs

this.filtText = '';

this.select = function(setTab){
    this.tab = setTab;

    if(setTab === 2){
        this.filtText = 'appetizer';
    }
    else if(setTab === 3){
        this.filtText = 'mains';
    }
    else if(setTab === 4){
        this.filtText = 'dessert';
    }
    else{
        this.filtText = '';
    }
};

so in dish data if it finds the appropriate filtText it will display else not

______________________________________________________


Assignment completed - dishdetail.html

______________________________________________________

Scope


Glue between view and controller

Controller gets data from model and attaches it to scope. This scope is available to the view

The topmost scope is called $rootScope
This is created by angular when your app starts
As angular traverses DOM it creates new scopes when it encounters some directives

ng-controller creates new scope under $rootScope

So whenever controllers are created within the Angular application,
the topmost controllers all inherit a scope which is a child of the root scope.
Now this is where this is tied to the way JavaScript prototype works.
The child scope, when it is created, automatically the child gets access to everything in that parent scope.
All the properties of the parent scope.


Form validation

Angular validates the form fields before copying value over to the $scope

Some directives :
ng-minlength,ng-maxlength,ng-pattern

Angular associates certain properties

name of form: feedbackForm
name of input: firstName

Properties:
$pristine -> true if form has not been changed
$dirty -> rev of $pristine
$valid -> true if form field/ whole form is valid
$invalid -> oppo of valid

eg: feedbackForm.firstName.$pristine in form and $scope.feedbackForm.firstName.$pristine in controller


Use this in consumeration with bootstrap classes like:
has-error, has-warning, has-success
help-block to display helpful messages



FORM VALIDATION


go to contactus.html

Apply a controller ContactController to entire page ie in container
Also apply a separate controller FeedbackController for the form

so we are using nested controllers

.controller('ContactController',['$scope', function($scope){

}])
.controller('FeedbackController',['$scope', function($scope){

}]);

FeedbackController is nested inside ContactController so whatever i define inside ContactController is also available in
FeedbackController


In ContactController do:

.controller('ContactController', ['$scope', function ($scope) {
    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };
}])


Now we can define these vars in the view so that 2 way data binding may apply













