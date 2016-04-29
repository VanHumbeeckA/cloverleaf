import compontents from '../module';

class MealCtrl {

    constructor($scope, $state, suggesterSvc) {
        $scope.viewModel(this);
        this.suggesterSvc = suggesterSvc;
        this.$state = $state;
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

    chooseProducts() {
        this.$state.go('recipe-product-details', {
            planning: this.planning
        })
    }
}

compontents.component('meal', {
    templateUrl: 'client/components/meal/meal.html',
    controller: ['$scope', '$state', 'suggesterSvc', MealCtrl],
    bindings: {
        planning: '='
    }
});