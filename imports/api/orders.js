import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

var Schemas = Schemas || {};

Schemas.Orders = new SimpleSchema({
    userId: {
        type: String
    },
    consumedProductsId: {
        type: [String]
    }
});


