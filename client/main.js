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
    .config(['$mdThemingProvider', ($mdThemingProvider) => new ColorConfig($mdThemingProvider)])
    .run(($state, $rootScope) => {
        $rootScope.$on('$stateChangeStart', (e, toState) => {
            console.log(toState);
            if (toState.name != 'home' && !Meteor.userId()) {
                e.preventDefault();
                $state.go('home');
            }
        });
    });

function onReady() {
    angular.bootstrap(document, ['cloverleaf']);
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}

class ColorConfig {
    constructor($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('light-green');
    }
}

class RoutingConfig {

    constructor($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'client/views/home.html',
                controller: 'homeCtrl as ctrl'
            })
            .state('my-week', {
                url: '/my-week',
                templateUrl: 'client/views/my-week.html'
            })
            .state('recipe-product-details', {
                url: '/recipe-product-details',
                templateUrl: 'client/views/recipe-product-details.html',
                controller: function($scope, $state, $stateParams) {
                    if ($stateParams.planning == null) {
                        $state.go('my-week');
                    }
                    $scope.planning = $stateParams.planning;
                },
                params: {
                    planning: null
                }
            })
            .state('suggester', {
                url: '/suggester',
                templateUrl: 'client/views/suggest-random.html'
            })
    }
}