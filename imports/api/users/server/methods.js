import {ValidatedMethod} from '/imports/lib';
import {userMainSchema} from '/imports/api/users';
import {Users} from '/imports/api/users';
export const createUser = new ValidatedMethod({
    name: 'create.user',
    access: 'public',
    schema: userMainSchema.pick('username', 'password').schema(),
    run ({username, password}) {
        return Accounts.createUser({username, password});
    }
});

export const fromColor = new ValidatedMethod({
    name: 'setFromColor',
    access: 'public',
    schema: {
        color: {
            type: String
        }
    },
    run ({color}) {
        console.log(color)
        Users.update(Users.getLoggedInId(), {$set: {'settings.from': color}})
    }
});

export const toColor = new ValidatedMethod({
    name: 'setToColor',
    access: 'public',
    schema: {
        color: {
            type: String
        }
    },
    run ({color}) {
        Users.update(Users.getLoggedInId(), {$set: {'settings.to': color}})
    }
})
export const userState = new ValidatedMethod({
    name: 'setUserState',
    access: 'public',
    schema: {},
    run ({}) {
        const user = Users.getLoggedIn();
        Users.update(user._id, {$set: {idle: user.idle ? false : true}})
    }
})