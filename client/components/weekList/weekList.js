import angular from 'angular';
import components from '../module';
import moment from 'moment';
import {Planning} from "../../../imports/api/planning.js";

import template from './weekList.html';

class WeekListCtrl {
    constructor($scope, $q, suggesterSvc) {
        this.suggesterSvc = suggesterSvc;
        this.$q = $q;
        $scope.viewModel(this);

        this.subscribe('planning');

        this.helpers({
            planning() {
                const selector = {};

                // If hide completed is checked, filter tasks
                // if (this.getReactively('hideCompleted')) {
                //     selector.checked = {
                //         $ne: true
                //     };
                // }

                // var cursor = ;

                return Planning.find({});
            }
        });

        this.googleCalender = [];
        this.week = [];

        Meteor.call('calendar.get',(error, result) => {
            if(error) {
                console.error(error);
            } else {
                this.googleCalender = result;
                this.generateWeek();
            }
        });
    }

    generateWeek() {
        var today = moment();
        var promises = [];


        for (var i = 0; i < 7; i++) {
            var date = moment(today).add(i, 'days');

            var calenderEvents = [];
            for (var j = 0; j < this.googleCalender.length; j++) {
                let startEventDate = this.googleCalender[j].start.date ? moment(this.googleCalender[j].start.date ) : moment(this.googleCalender[j].start.dateTime);
                let endEventDate = this.googleCalender[j].start.date ? moment(this.googleCalender[j].end.date ) : moment(this.googleCalender[j].end.dateTime);

                if (date.isSame(startEventDate, 'day')) {
                    calenderEvents.push({
                        summary: this.googleCalender[j].summary,
                        time: this.googleCalender[j].start.dateTime ? '@' + moment(this.googleCalender[j].start.dateTime).format('HH:mm') : 'Starts today'
                    });
                }
                else if (date.isSame(endEventDate, 'day')) {
                    calenderEvents.push({
                        summary: this.googleCalender[j].summary,
                        time: this.googleCalender[j].end.dateTime ? '@' + moment(this.googleCalender[j].start.dateTime).format('HH:mm') : 'Ends today'
                    });
                }
                else if (date.isBetween(startEventDate, endEventDate, 'day')) {
                    calenderEvents.push({
                        summary: this.googleCalender[j].summary,
                        time: 'during the day'
                    });
                }
            }

            var planning = {
                weekday: date.format('dddd'),
                day: date.toDate(),
                calenderEvents: calenderEvents
            };
            this.week.push(planning);

            promises.push(this.suggesterSvc.getNewRecipe());
        }
        
        this.$q.all(promises).then(results => {
            _.forEach(results, (recipe, index) => {
                this.week[index].recipe = recipe;
            });
        });
    }
}

components
    .component('weekList', {
        templateUrl: 'client/components/weekList/weekList.html',
        controller: ['$scope', '$q', 'suggesterSvc', WeekListCtrl]
    });