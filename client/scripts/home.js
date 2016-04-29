import cloverleaf from './module';
import angular from 'angular';

class HomeCtrl {

    constructor($state) {
        this.$state = $state;
        if (Meteor.userId()) {
            $state.go('my-week');
        }
        this.dontShowNav = true;
    }

    loginWithGoogle(){
        console.log("YesH!");
        Meteor.loginWithGoogle({ requestPermissions:['https://www.googleapis.com/auth/calendar.readonly']}, (err) => {
            console.log("YesH!");
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

}

cloverleaf.controller('homeCtrl', ['$state', HomeCtrl]);
