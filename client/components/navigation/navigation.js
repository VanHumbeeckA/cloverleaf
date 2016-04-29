import angular from 'angular';
import components from '../module';
import template from './navigation.html';

class NavigationCtrl {
    constructor($scope, $state) {
        this.$state = $state;
        $scope.viewModel(this);
        this.loggedIn = false;
        this.username = "";
        if (Meteor.userId()) {
            this.loggedIn = true;
        }
        this.autorun(() => {


                if(Meteor.user()){
                    this.username = "Welkom " + Meteor.user().profile.name.split(' ')[0]+ "!";
                    this.loggedIn = true;
                } else{
                    this.username = ""
                };
        });
    }



    loginWithGoogle(){
        Meteor.loginWithGoogle({ requestPermissions:['https://www.googleapis.com/auth/calendar.readonly']}, (err) => {
            if (err) {
                //Session.set('errorMessage', err.reason || 'Unknown error');
                console.error(err);
                this.loggedIn = false;
            }
            else {
                console.info("User logged in")
                this.loggedIn = true;
                this.username = "Welkom " + Meteor.user().profile.name.split(' ')[0]+ "!";
                this.$state.go('my-week');
            }
        });
    }

    test(){
        Meteor.call('meal.addProducts','HeccNMgd8QoR2JR5k',function(error, result) {
            if(error) console.error(error);
            console.log(result );
        });
    }

    logout(){
        Meteor.logout( (err) => {
            this.loggedIn = false;
            this.$state.go('home');
            if(err)console.error(err);
        });
    }

}

components
    .component('navigation', {
        templateUrl: 'client/components/navigation/navigation.html',
        controller: ['$scope', '$state', NavigationCtrl]
    })