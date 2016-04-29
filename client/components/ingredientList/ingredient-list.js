import components from '../module'

class IngredientList {

}

components.component('ingredientList', {
    templateUrl: 'client/components/ingredientList/ingredient-list.html',
    controller: [IngredientList],
    bindings: {
        ingredients: '='
    }
});

