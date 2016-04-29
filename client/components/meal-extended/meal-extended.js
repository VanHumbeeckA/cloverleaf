import compontents from '../module';

class MealExtendedCtrl {

    constructor($scope, suggesterSvc) {
        $scope.viewModel(this);
        this.suggesterSvc = suggesterSvc;
    }



    goBack() {
        $state.go('my-week');
    }
}

compontents.component('meal-extended', {
    templateUrl: 'client/components/meal-extended/meal-extended.html',
    controller: ['$scope', 'suggesterSvc', MealExtendedCtrl],
    bindings: {
        planning: '='
    }
});