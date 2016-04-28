import angular from 'angular';

import template from './navigation.html';

export default angular.module('navigation', [])
    .component('navigation', {
        templateUrl: 'imports/ui/components/navigation/navigation.html',
    })