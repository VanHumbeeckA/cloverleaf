import compontents from '../module';

class MealCtrl {

}

compontents.component('meal', {
    templateUrl: 'client/components/meal/meal.html',
    controller: [MealCtrl],
    bindings: {
        planning: '='
    }
});