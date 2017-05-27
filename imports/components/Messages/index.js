import {composeWithTracker} from '/imports/lib';
import {Meteor} from 'meteor/meteor';
import {Messages as MessagesCollection}from '/imports/api/messages';
import {Users} from '/imports/api/users';
//Component
import Messages from './Messages';

const getData = (props = {},onData) => {
    if(!Meteor.subscribe('messages.all').ready()){
        return;
    }

    const messages = MessagesCollection.find().fetch()
    onData(null,{
        messages,
    });
};

export default composeWithTracker(getData)(Messages);

