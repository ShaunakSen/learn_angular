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


Binding Select:

var channels = [
    {value:"tel", label:"Tel"},
    {value:"Email", label:"Email"}
];

In view:

<select class="form-control" ng-model="feedback.mychannel"
    ng-options="channel.value as channel.label for channel in channels">
    <option value="">Tel or Email? </option>
</select>



Angular validates the form fields before copying value over to the $scope

Some directives :
ng-minlength,ng-maxlength,ng-pattern(takes in a regexp)

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


For firstname field:

<input type="text" class="form-control" id="firstname"
                               name="firstname" placeholder="Enter First Name" ng-model="feedback.firstName" required>

For lastname:

<input type="text" class="form-control" id="lastname"
                               name="lastname" placeholder="Enter Last Name" ng-model="feedback.lastName" required>


For areacode:

<input type="tel" class="form-control" id="areacode"
                                   name="areacode" placeholder="Area code" ng-model="feedback.tel.areaCode">


feedback.tel.areaCode does not exist in feedback object in controller
But as we are creating ng-model here, it will be automatically be created and added to js feedback object

For telnum:

<input type="tel" class="form-control" id="telnum"
                               name="telnum" placeholder="Tel. number" ng-model="feedback.tel.number">


For emailid:

<input type="email" class="form-control" id="emailid" name="emailid"
                               placeholder="Email" ng-model="feedback.email" required>

For checkbox:

<input type="checkbox" name="approve" value="" ng-model="feedback.agree">

For textarea:

<textarea class="form-control" id="feedback" ng-model="feedback.comments" name="feedback"
                                      rows="12"></textarea>


comments property does not exist in object yet


To the main form tag:
<form class="form-horizontal" role="form" name="feedbackForm" ng-submit="sendFeedback()" novalidate>

Note: angular uses the name of form to perform validation

Now we add angular validation to form


First Name

<span ng-show="feedbackForm.firstname.$error.required && !feedbackForm.firstname.$pristine" class="help-block">
    Your First Name is required
</span>


Also to the form-group class that contains this input u can apply has-error class to provide some
nice visual feedback

<div class="form-group" ng-class="{'has-error': feedbackForm.firstname.$error.required && !feedbackForm.firstname.$pristine}">


Same for lastname field

emailid:

first 1 want a little red icon to appear inside input if email is invalid

apply class has-feedback and has-error in form-group:

<div class="form-group" ng-class=
"{'has-error has-feedback': feedbackForm.emailid.$invalid && !feedbackForm.emailid.$pristine}">


For icon:

<span ng-show="feedbackForm.emailid.$invalid && !feedbackForm.emailid.$pristine"
    class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true">
</span>

Other error msgs for email:
<span ng-show="feedbackForm.emailid.$invalid && !feedbackForm.emailid.$pristine"
    class="help-block">Enter a valid Email Address
</span>
<span ng-show="feedbackForm.emailid.$error.required  && !feedbackForm.emailid.$pristine"
    class="help-block">Enter a valid Email Address
</span>


For select element:

We want to dynamically add options to select element

Also we want to display select elements iff user checks checkbox

So to div which contains select elements:

<div class="col-sm-3 col-sm-offset-1" ng-show="feedback.agree">

In ContactController:

$scope.channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];
$scope.invalidChannelSelection = false;

In view:

<select class="form-control" ng-model="feedback.mychannel"
    ng-options="channel.value as channel.label for channel in channels">
    <option value="">Tel or Email?</option>
</select>

Also note we add ng-model="feedback.mychannel" to enable 2 way data binding

Also for that form-group:

<div class="form-group" ng-class="{'has-error': invalidChannelSelection}">


Below select element:

<span ng-show="invalidChannelSelection" class="help-block">
    Select an option..
</span>

the idea of invalidChannelSelection is to check whether user has selected valid option or not

For button:

<button type="submit" class="btn btn-primary" ng-disabled="feedbackForm.$invalid">
    Send Feedback
</button>

ng-disabled="feedbackForm.$invalid"

This ensures that button will be disabled as long as user doesnt fill out the required fields

Now to do validation of select element

In FeedbackController:

$scope.sendFeedback = function(){
    console.log($scope.feedback);
}

Adding code for checkbox validation:

$scope.sendFeedback = function(){
    console.log($scope.feedback);

    if($scope.feedback.agree && $scope.feedback.mychannel == ""){
        $scope.invalidChannelSelection = true;
        console.log('incorrect option');
    }
    else{
        $scope.invalidChannelSelection = false;
        //here ideally u would issue AJAX call to send data to server
        // restore default values now
        $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };
        $scope.feedbackForm.$setPristine();
        console.log('Restored default values.... ' + $scope.feedback);

    }
}