import {Meteor} from 'meteor/meteor';

//Collection
import {Messages} from '/imports/api/messages';

//Basic User Data
Meteor.publish('messages.all', function () {
    if (!this.userId) {
        return [];
    }

    return Messages.find({}, {fields: {_id: 1, createdAt: 1, createdBy: 1, text: 1}});
});