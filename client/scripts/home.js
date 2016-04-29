import cloverleaf from './module';

class HomeCtrl {

    constructor($state) {
        if (Meteor.userId()) {
            $state.go('my-week');
        }
    }
}

cloverleaf.controller('homeCtrl', ['$state', HomeCtrl]);
