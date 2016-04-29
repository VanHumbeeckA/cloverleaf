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