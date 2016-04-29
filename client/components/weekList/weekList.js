import angular from 'angular';
import components from '../module';
import moment from 'moment';
import {Planning} from "../../../imports/api/planning.js";
import {Recipes} from '../../../imports/api/recipes.js';
import lodash from 'lodash';

import template from './weekList.html';

class WeekListCtrl {
    constructor($scope, $q, suggesterSvc) {
        var _ = lodash;
        this.suggesterSvc = suggesterSvc;
        this.$q = $q;
        $scope.viewModel(this);

        this.googleCalender = [];
        this.week = [];
        this.triggerPlanningsFlow = new ReactiveVar(false);

        this.subscribe('planning');

        this.autorun(() => {
            this.triggerPlanningsFlow.get();
            var cursor = Planning.find({});
            var plannings = cursor.fetch();
            var promises = [];

            var indexes = [];
            var nbOfEeaters = [];

            for (var i = 0; i < plannings.length; i++) {
                for (var j = 0; j < this.week.length; j++) {
                    if (moment(plannings[i].day).isSame(moment(this.week[j].day), 'day')) {
                        promises.push(this.getRecipe(plannings[i].meal.recipeId));
                        nbOfEeaters.push(plannings[i].meal.nbOfEaters);
                        indexes.push(j);
                    }
                }
            }

            var obj0 = _.zipObject(indexes, nbOfEeaters);
            _.forEach(_.keys(obj0), (i) => {
                this.week[i].nbOfEaters = obj0[i];
            });

            this.$q.all(promises).then(results=>{
                var obj = _.zipObject(indexes, results);
                _.forEach(_.keys(obj), (key) => {
                    this.week[key].recipe = obj[key];
                });
            })
        });

        this.helpers({
            planning() {
                return Planning.find({});
            }
        });

        Meteor.call('calendar.get',(error, result) => {
            if(error) {
                console.error(error);
            } else {
                this.googleCalender = result;
                this.generateWeek();
                this.triggerPlanningsFlow.set(true);
            }
        });
    }

    getRecipe(id) {
        var deferred = this.$q.defer();
        var recipe = Meteor.call('recipes.getRecipe', id, function(err, result) {
            if (err) {
                deferred.reject(err)
            } else {
                deferred.resolve(result)
            }
        });

        return deferred.promise;
    }

    generateWeek() {
        var today = moment();

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
        }
    }
}

components
    .component('weekList', {
        templateUrl: 'client/components/weekList/weekList.html',
        controller: ['$scope', '$q', 'suggesterSvc', WeekListCtrl]
    });