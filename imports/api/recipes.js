import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

// READ ONLY! no methods here!
export const Recipes = new Mongo.Collection('recipes');

if (Meteor.isServer) {
    Meteor.publish('all-recipes', function() {
        return Recipes.find({});
    });

    Meteor.publish('recipe', function(tag) {
        check(tag, String);

        return Recipes.find({name: { $regex: '*' + tag + '*'}});
    });
}