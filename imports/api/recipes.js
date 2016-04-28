import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

// READ ONLY! no methods here!
export const Recipes = new Mongo.Collection('recipes');

if (Meteor.isServer) {
    Meteor.publish('all-recipes-names', function recipesPublication() {
        return Recipes.find({}, {name: 1});
    });

    Meteor.publish('recipeCount', function recipesPublication() {
        return Recipes.find({}, {name: 1}).count();
    })
}

Meteor.methods({
    'recipes.count' () {

        // Make sure the user is Logged in
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        return Recipes.find().count();
    },
    'recipes.getNewRecipe' () {
        var array = Recipes.find().fetch();
        var randomIndex = Math.floor( Math.random() * array.length );
        var element = array[randomIndex];
        return element;
    }
});




var Schemas = Schemas || {};

Schemas.Structured = new SimpleSchema({
    quantity: {
        type: String
    },
    measure: {
        type: String
    },
    ingredient: {
        type: String
    }
});

Schemas.Ingredient = new SimpleSchema({
    structured: {
        type: Schemas.Structured
    },
    unstructured: {
        type: String
    }
});

Schemas.Recipes = new SimpleSchema({
    name: {
        type: String
    },
    url: {
        type: String
    },
    image: {
        type: String
    },
    summary: {
        type: String
    },
    description: {
        type: String
    },
    extra: {
        type: [String]
    },
    ingredients: {
        type: [Schemas.Ingredient]
    }
});

Recipes.attachSchema(Schemas.Recipes);