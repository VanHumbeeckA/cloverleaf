import {Meteor} from 'meteor/meteor';
// import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Recipes} from '../../../imports/api/recipes.js';
import services from './module';

class Suggester {
    constructor($q) {
        this.$q = $q;
        // this.subscribe('all-recipes-names'); // TODO: not working

    }

    getNewRecipe() {
        var deferred = this.$q.defer();
        Meteor.call('recipes.getNewRecipe', (err, result) => {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }
    
    getRecipe(id) {
        console.log(id);
        var recipe = Recipes.findOne({_id: id});
        console.log(recipe);
        return recipe;
    }
}

services.service('suggesterSvc', ['$q', ($q) => new Suggester($q)]);

