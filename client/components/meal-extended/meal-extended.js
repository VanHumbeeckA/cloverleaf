import compontents from '../module';
import {Planning} from '../../../imports/api/planning';
import {Meteor} from 'meteor/meteor';

class MealExtendedCtrl {

    constructor($scope, $state, suggesterSvc) {
        $scope.viewModel(this);
        this.suggesterSvc = suggesterSvc;
        this.$state = $state;
        console.log(this.planning);
        this.subscribe('planning');

        var planning = this.planning;
        this.helpers({
            planning() {
                return Planning.findOne({_id: new Meteor.Collection.ObjectID(planning._id)})
            }
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