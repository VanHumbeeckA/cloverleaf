import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import compontents from '../module';
import {Planning} from '../../../imports/api/planning';

class MealExtendedCtrl {

    constructor($scope, $state, suggesterSvc) {
        $scope.viewModel(this);
        this.suggesterSvc = suggesterSvc;
        this.$state = $state;
        this.subscribe('planning');
        this.recipeNameVar = new ReactiveVar("")

        var plan = this.planning;
        if (plan == null) return;



        // debugger;
        // var oid = new Meteor.Collection.ObjectID(planning._id);
        this.helpers({
            planning() {
                var p = Planning.findOne({_id: plan._id});
                // console.log(p)
                return p;
            },
            recipeName() {
                return this.recipeNameVar.get()
            }
        });

        this.autorun(() => {
            var p = Planning.findOne({_id: plan._id});

            Meteor.call('recipes.getRecipe', p.meal.recipeId, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                    this.recipe = result;
                    this.recipeNameVar.set(result.name);
                }
            });
        });

    }

    goBack() {
        this.$state.go('my-week');
    }
}

compontents.component('mealExtended', {
    templateUrl: 'client/components/meal-extended/meal-extended.html',
    controller: ['$scope', '$state', 'suggesterSvc', MealExtendedCtrl],
    bindings: {
        planning: '='
    }
});