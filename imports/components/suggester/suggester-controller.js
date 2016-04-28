import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Recipes } from '../../api/recipes';

import template from './suggester.html';

class SuggesterCtrl {
    constructor($scope) {
        $scope.viewModel(this);

        this.subscribe('recipes');

        this.helpers({
            randomRecipe() {
                const selector = {};

                // If hide completed is checked, filter tasks
                if (this.getReactively('hideCompleted')) {
                    
                }

                var total = Recipes.find({}).count();
                var random = Math.round(Math.random()*total);
                
                return Recipes.find({}).limit(-1).skip(random).next();
            },
            currentUser() {
                return Meteor.user();
            }
        });
    }

    addRecipe(recipeId, day) {
        Meteor.call('planning.insert', recipeId, day);
    }
}

// export default angular.module('todosList', [
//         angularMeteor
//     ])
//     .component('todosList', {
//         templateUrl: 'imports/components/todosList/todosList.html',
//         controller: ['$scope', TodosListCtrl]
//     });