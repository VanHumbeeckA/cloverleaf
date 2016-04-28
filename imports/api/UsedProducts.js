import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

// READ ONLY! no methods here!
export const ConsumedProducts = new Mongo.Collection('consumedProducts');

var Schemas = Schemas || {};

Schemas.ConsumedProducts = new SimpleSchema({
    productId: {
        type: String
    },
    orderId: {
        type: String
    },
    mealIds: {
        type: [String]
    }
});

ConsumedProducts.attachSchema(Schemas.ConsumedProducts);