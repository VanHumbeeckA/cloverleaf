import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import moment from 'moment';

// READ ONLY! no methods here!
export const Planning = new Mongo.Collection('planning', {idGeneration: 'MONGO'});

if (Meteor.isServer) {
    Meteor.publish('planning', function planningPublication() {
        return Planning.find({userId: this.userId});
    });
}

Meteor.methods({
    'planning.update' (planning) {
        check(planning.day, Date);
        
        // console.log(planning);

        // Make sure the user is Logged in
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        
        // Planning.upsert()
        return Planning.upsert({'day': moment(planning.day).format('YYYY-MM-DD'), 'userId': Meteor.userId()}, {$set: {
            day: moment(planning.day).format('YYYY-MM-DD'),
            userId: Meteor.userId(),
            meal: {
                nbOfEaters: planning.nbOfEaters ? planning.nbOfEaters : 4,
                recipeId: planning.recipe && planning.recipe._id ? planning.recipe._id._str : null
            }
        }});
    },
})

var Schemas = Schemas || {};

Schemas.Product = new SimpleSchema({
       ingredientName: {
           type: String,
           optional: true
       },
       name:  {
           type: String,
           optional: true
       },
        price:  {
            type: String,
            optional: true
        },
       pic:  {
           type: String,
           optional: true
       },
        unit:  {
            type: String,
            optional: true
        }
});

Schemas.Meal = new SimpleSchema({
    nbOfEaters: {
        type: Number,
        min: 1
    },
    products: {
        type: [Schemas.Product],
        optional: true // TODO
    },
    recipeId: {
        type: String,
        optional: true
    }
});

Schemas.Planning = new SimpleSchema({
    day: {
        type: String // format YYYY-MM-DD
    },
    userId: {
        type: String
    },
    meal: {
        type: Schemas.Meal
    }
});


Planning.attachSchema(Schemas.Planning);