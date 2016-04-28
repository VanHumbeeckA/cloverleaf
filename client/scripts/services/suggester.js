import {Meteor} from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import {Recipes} from '../../../imports/api/recipes.js';
import services from './module';

class Suggester {
    constructor($q) {
        this.$q = $q;
        //this.subscribe('all-recipes-names');
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
}

services.service('suggesterSvc', ['$q', ($q) => new Suggester($q)]);

