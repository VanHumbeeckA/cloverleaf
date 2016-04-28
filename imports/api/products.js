import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

// READ ONLY! no methods here!
export const Products = new Mongo.Collection('products');

var Schemas = Schemas || {};

Schemas.Products = new SimpleSchema({
    ingredientName: {
        type: String
    },
    brand: {
        type: String
    },
    quantity: {
        type: Number
    },
    unit: {
        type: String
    },
    tags: {
        type: [String]
    }
});

Products.attachSchema(Schemas.Products);