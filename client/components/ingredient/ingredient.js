import components from '../module'

class Ingredient {

}

components.component('ingredient', {
    templateUrl: 'client/components/ingredient/ingredient.html',
    controller: [Ingredient],
    bindings: {
        ingredient: '='
    }
});

