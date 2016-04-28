import angular from 'angular';
import components from '../module';
import moment from 'moment';

import template from './weekList.html';

class WeekListCtrl {
    constructor($scope, $q, suggesterSvc) {
        this.suggesterSvc = suggesterSvc;
        this.$q = $q;
        $scope.viewModel(this);

        this.helpers({});

        this.week = [];
        this.generateWeek();
    }

    generateWeek() {
        var today = moment();
        var promises = [];
        for (var i = 0; i < 7; i++) {
            var date = moment(today).add(i, 'days');

            var planning = {
                day: date.toDate(),
                nbOfEaters: 2
            };
            this.week.push(planning);
            promises.push(this.suggesterSvc.getNewRecipe());
        }
        
        this.$q.all(promises).then(results => {
            _.forEach(results, (recipe, index) => {
                this.week[index].recipe = recipe;
            });
        })
    }
}

components
    .component('weekList', {
        templateUrl: 'client/components/weekList/weekList.html',
        controller: ['$scope', '$q', 'suggesterSvc', WeekListCtrl]
    });