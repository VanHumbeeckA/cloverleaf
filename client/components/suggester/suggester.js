import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { ReactiveVar } from 'meteor/reactive-var'
import compontents from '../module';
import {Recipes} from '../../../imports/api/recipes.js';
import {Tasks} from "../../../imports/api/tasks.js";
import template from './suggester.html';

class SuggesterCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.subscribe('recipes');

        this.toggleNewRecipe = new ReactiveVar(true);

        this.helpers({
            randomRecipe() {

                // // If hide completed is checked, filter tasks
                // if (this.getReactively('hideCompleted')) {
                //
                // }

                this.toggleNewRecipe.get();

                var total = Recipes.find().count();
                var random = Math.round(Math.random()*total);
                console.log(total);
                // return Recipes.findOne();
                return Tasks.findOne();
            },
            currentUser() {
                return Meteor.user();
            }
        });
    }

    getNewRecipe() {
        console.log('get new recipe');
        this.toggleNewRecipe.set(!this.toggleNewRecipe.get());
        console.log(this.toggleNewRecipe.get())
    }
}



class MealCtrl {

}

compontents.component('suggester', {
    templateUrl: 'client/components/suggester/suggester.html',
    controller: ['$scope', SuggesterCtrl],
});