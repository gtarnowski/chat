import {Meteor} from 'meteor/meteor';
import {Users} from '/imports/api/users';
import {Messages} from '/imports/api/messages';

Messages.find().observeChanges({
    added: function (message) {
        const users = Users.find({_id: {$ne: message.userId}})

    }
})


