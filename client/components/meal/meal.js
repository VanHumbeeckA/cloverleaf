import compontents from '../module';

class MealCtrl {

    increaseNbOfEaters() {
        this.planning.nbOfEaters++;
    }
    
    decreaseNbOfEaters() {
        this.planning.nbOfEaters--;
    }
}

compontents.component('meal', {
    templateUrl: 'client/components/meal/meal.html',
    controller: [MealCtrl],
    bindings: {
        planning: '='
    }
});