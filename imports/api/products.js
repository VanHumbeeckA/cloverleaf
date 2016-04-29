import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Planning} from './planning'
import {Recipes} from './recipes'
import moment from 'moment';

// READ ONLY! no methods here!
export const Products = new Mongo.Collection('products', {idGeneration: 'MONGO'});



Meteor.methods({
    'meal.addProducts' (planningId) {

        var meal = Planning.findOne({_id: planningId}).meal;
        var recipe = Recipes.findOne({_id: new Meteor.Collection.ObjectID(meal.recipeId)});
        var defaultProducts = [];
        recipe.ingredients.forEach((ingredient) => {
            var firstProduct = Products.findOne({ingredientName: ingredient.structured.ingredient})
            if(firstProduct){
                defaultProducts.push(firstProduct);
            }
        });
        meal.products = defaultProducts;
        Planning.update({_id: planningId},{$set: {meal: meal}});

        return "done!";

    }
});

var Schemas = Schemas || {};

Schemas.Products = new SimpleSchema({
    ingredientName: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    pic: {
        type: String
    },
    unit: {
        type: String
    }

});

Products.attachSchema(Schemas.Products);