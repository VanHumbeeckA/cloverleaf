import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

// READ ONLY! no methods here!
export const Recipes = new Mongo.Collection('recipes');

if (Meteor.isServer) {
    Meteor.publish('recipes', function() {
        return Recipes.find({});
    });
}

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