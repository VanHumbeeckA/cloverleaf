import compontents from '../module';

class MealCtrl {

    constructor(suggesterSvc) {
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
                Meteor.call('recipes.up')
                this.planning.recipe = r;
            });
    }
}

compontents.component('meal', {
    templateUrl: 'client/components/meal/meal.html',
    controller: ['suggesterSvc', MealCtrl],
    bindings: {
        planning: '='
    }
});