import angular from 'angular';
import components from '../module';
import moment from 'moment';

import template from './weekList.html';

class WeekListCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.helpers({});

        this.week = [];
        this.generateWeek();
    }

    generateWeek() {
        var today = moment();
        for (var i = 0; i < 7; i++) {
            var date = moment(today).add(i, 'days');

            this.week.push({
                day: date.toDate(),
                nbOfEaters: 2
            });
        }
    }
}

components
    .component('weekList', {
        templateUrl: 'client/components/weekList/weekList.html',
        controller: ['$scope', WeekListCtrl]
    });