import {Meteor} from 'meteor/meteor';
import {Users} from '/imports/api/users';

Meteor.startup(()=>{
    if (!Users.findOne()) {
        const user = {
            username: 'root',
            password: 'root'
        }

        Accounts.createUser(user)
        console.log(user)
    }
});