import compontents from '../module';
import {Planning} from "../../../imports/api/planning.js";

class CalenderCtrl {

    constructor($scope, suggesterSvc) {
        this.suggesterSvc = suggesterSvc;
    }
    
    needFood() {
        this.suggesterSvc.getNewRecipe()
            .then(r => {
                // this.planning.recipe = r;
                console.log(this.planning);
                let planningToUpdate = {
                    day: this.planning.day,
                    nbOfEaters: this.planning.nbOfEaters,
                    recipe: r
                };
                Meteor.call('planning.update', planningToUpdate);
            });
    }

}

compontents.component('calender', {
    templateUrl: 'client/components/calender/calender.html',
    controller: ['$scope', 'suggesterSvc', CalenderCtrl],
    bindings: {
        planning: '='
    }
});