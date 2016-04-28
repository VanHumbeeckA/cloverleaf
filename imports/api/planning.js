import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

// READ ONLY! no methods here!
export const Planning = new Mongo.Collection('planning');

var Schemas = Schemas || {};

Schemas.Meal = new SimpleSchema({
    numberOfEaters: {
        type: Number,
        min: 1
    },
    consumedProductIds: {
        type: [String]
    },
    recipeId: {
        type: String,
        optional: true
    }
});

Schemas.Planning = new SimpleSchema({
    day: {
        type: Date
    },
    userId: {
        type: String
    },
    meal: {
        type: Schemas.Meal
    }
});


Planning.attachSchema(Schemas.Planning);