import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import todosList from '../imports/components/todosList/todosList';
import navigation from '../imports/ui/components/navigation/navigation';
import '../imports/startup/accounts-config';

angular.module('cloverleaf', [
    angularMeteor,
    ngMaterial,
    todosList.name,
    navigation.name,
    'accounts.ui'
]);

function onReady() {
    angular.bootstrap(document, ['cloverleaf']);
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}