import compontents from '../module';

class MealExtendedCtrl {

    constructor($scope, $state, suggesterSvc) {
        $scope.viewModel(this);
        this.suggesterSvc = suggesterSvc;
        this.$state = $state;
        console.log(this.planning);
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