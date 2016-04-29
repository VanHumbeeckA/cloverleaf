import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import todosList from '../imports/components/todosList/todosList';
import components from './components/module';
import services from './scripts/services/module';
import app from './scripts/module';
import 'angular-material-icons';
import '../imports/startup/accounts-config';

export default angular.module('cloverleaf', [
    angularMeteor,
    ngMaterial,
    uiRouter,
    todosList.name,
    components.name,
    services.name,
    app.name,
    'accounts.ui',
    'ngMdIcons'
]).config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => new RoutingConfig($stateProvider, $urlRouterProvider)])
    .run(($state, $rootScope) => {
        $rootScope.$on('$stateChangeStart', (e, toState) => {
            console.log(toState);
            if (toState.name != 'home' && !Meteor.userId()) {
                e.preventDefault();
                $state.go('home');
            }
        })
    });

function onReady() {
    angular.bootstrap(document, ['cloverleaf']);
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}

class RoutingConfig {

    constructor($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'client/views/home.html',
                controller: 'homeCtrl'
            })
            .state('my-week', {
                url: '/my-week',
                templateUrl: 'client/views/my-week.html'
            })
            .state('suggester', {
                url: '/suggester',
                templateUrl: 'client/views/suggest-random.html'
            })
    }
}