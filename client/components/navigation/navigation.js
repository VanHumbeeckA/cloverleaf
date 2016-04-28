import angular from 'angular';

import template from './navigation.html';

class NavigationCtrl {
    constructor($scope) {
        $scope.viewModel(this);
        this.username = "";
        this.loggedIn = false;
    }

    loginWithGoogle(){
        Meteor.loginWithGoogle({}, (err) => {
            console.log("returned");
            if (err) {
                //Session.set('errorMessage', err.reason || 'Unknown error');
                console.log(err);
                this.loggedIn = false;
            }
            else {
                console.log("true!!!")
                this.loggedIn = true;
                this.username = Meteor.user().profile.name;
            }
        });
    }

    logout(){
        Meteor.logout( (err) => {
            this.loggedIn = false;
            if(err)console.error(err);
        });
    }

}

export default angular.module('navigation', [])
    .component('navigation', {
        templateUrl: 'client/components/navigation/navigation.html',
        controller: ['$scope', NavigationCtrl]
    })