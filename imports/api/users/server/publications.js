import {Meteor} from 'meteor/meteor';

Meteor.publish(null, function() {
    return Meteor.users.find({_id: this.userId}, {fields: {_id: 1, settings: 1, username: 1}});
});