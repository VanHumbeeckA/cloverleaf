import compontents from '../module';

class MealCtrl {

    constructor($scope, suggesterSvc) {
        $scope.viewModel(this);
        this.suggesterSvc = suggesterSvc;
    }

    increaseNbOfEaters() {
        this.planning.nbOfEaters++;
    }
    
    decreaseNbOfEaters() {
        this.planning.nbOfEaters--;
    }

    newRecipe() {
        this.suggesterSvc.getNewRecipe()
            .then(r => {
                let planningToUpdate = {
                    day: this.planning.day,
                    nbOfEaters: this.planning.nbOfEaters,
                    recipe: r
                };
                Meteor.call('planning.update', planningToUpdate);
            });
    }

    deleteRecipe() {
        let planningToUpdate = {
            day: this.planning.day,
            nbOfEaters: this.planning.nbOfEaters,
            recipe: null
        };
        Meteor.call('planning.update', planningToUpdate);
    }
}

compontents.component('meal', {
    templateUrl: 'client/components/meal/meal.html',
    controller: ['$scope', 'suggesterSvc', MealCtrl],
    bindings: {
        planning: '='
    }
});