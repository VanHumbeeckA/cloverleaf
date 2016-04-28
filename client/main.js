import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import todosList from '../imports/components/todosList/todosList';
import components from './components/module';
import '../imports/startup/accounts-config';

angular.module('cloverleaf', [
    angularMeteor,
    ngMaterial,
    uiRouter,
    todosList.name,
    components.name,
    'accounts.ui'
]).config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => new RoutingConfig($stateProvider, $urlRouterProvider)]);

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

        $urlRouterProvider.otherwise('/my-week');

        $stateProvider
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