import angular from 'angular';
import components from '../module';
import template from './navigation.html';

class NavigationCtrl {
    constructor($scope) {
        $scope.viewModel(this);
        this.username = "";
        this.loggedIn = false;
    }

    loginWithGoogle(){
        Meteor.loginWithGoogle({}, (err) => {
            if (err) {
                //Session.set('errorMessage', err.reason || 'Unknown error');
                console.error(err);
                this.loggedIn = false;
            }
            else {
                console.info("User logged in")
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

components
    .component('navigation', {
        templateUrl: 'client/components/navigation/navigation.html',
        controller: ['$scope', NavigationCtrl]
    })