import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

// READ ONLY! no methods here!
export const ConsumedProducts = new Mongo.Collection('consumedProducts',{idGeneration: 'MONGO'});

var Schemas = Schemas || {};

Schemas.ConsumedProducts = new SimpleSchema({
    productId: {
        type: String
    },
    orderId: {
        type: String
    },
    planningIds: {
        type: [String]
    }
});

ConsumedProducts.attachSchema(Schemas.ConsumedProducts);