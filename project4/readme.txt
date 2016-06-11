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




