import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { ReactiveVar } from 'meteor/reactive-var'
import compontents from '../module';
import {Recipes} from '../../../imports/api/recipes.js';
import template from './suggester.html';

class SuggesterCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.subscribe('all-recipes-names');

        this.recipeCountVar = new ReactiveVar(0);
        this.randomRecipeNameVar = new ReactiveVar("Click the randomizer button!");

        this.helpers({
            recipes() {
                return Recipes.find();
            },
            recipeCount() {
                return this.recipeCountVar.get();
            },
            randomRecipe() {
                return this.randomRecipeNameVar.get();
            },

            currentUser() {
                return Meteor.user();
            }
        });

        Meteor.call('recipes.count', (error, result) => {
            this.recipeCountVar.set(result);
        })
    }

    getNewRecipe() {
        var array = Recipes.find().fetch();
        var randomIndex = Math.floor( Math.random() * array.length );
        var element = array[randomIndex];
        console.log(element);
        if (element) {
            this.randomRecipeNameVar.set(element.name);
        }
    }


}



class MealCtrl {

}

compontents.component('suggester', {
    templateUrl: 'client/components/suggester/suggester.html',
    controller: ['$scope', SuggesterCtrl],
});