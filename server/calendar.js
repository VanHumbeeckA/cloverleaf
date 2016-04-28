import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {HTTP} from 'meteor/http';

// READ ONLY! no methods here!
//export const Users = new Mongo.Collection('users');

Meteor.methods({
    'calendar.get' () {

        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        var maxDate = addDays(new Date(),7);

        var options = {
            headers:{Authorization: 'Bearer ' + Meteor.user().services.google.accessToken},
            params: {
                timeMin: ISODateString(new Date()),
                timeMax: ISODateString(maxDate)}

        };
        var result=HTTP.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', options);
        console.log(filterEventKeys(result.data.items));
        //console.log(ISODateString(new Date()));

        return filterEventKeys(result.data.items);

    },
});

function filterEventKeys(events){
    var usefulKeys = ['htmlLink','summary','start','end'];
    var toReturn = [];
    events.forEach((item) => {
        var value = {};
        usefulKeys.forEach((key) => {
            value[key] = item[key];
        });
        toReturn.push(value);
    });

    return toReturn;
}



function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}

    return d.getUTCFullYear()+'-'
        + pad(d.getUTCMonth()+1)+'-'
        + pad(d.getUTCDate())+'T'
        + pad(d.getUTCHours())+':'
        + pad(d.getUTCMinutes())+':'
        + pad(d.getUTCSeconds())+'Z'
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}