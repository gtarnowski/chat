import  {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const userSchema = new SimpleSchema({
    username: {
        type: String
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String,
        custom () {
            const {isSet, value} = this;

            if (!isSet || !value) {
                return 'passwordFieldRequired';
            }
            return undefined;
        },
        optional: true
    },
    idle: {
        type: Boolean,
        optional: true
    },
    settings: {
        type: Object,
        defaultValue: {
            from: 'pink',
            to: 'blue'
        }
    },
    'settings.from': {
        type: String
    },
    'settings.to': {
        type: String
    }
});

export const userMainSchema = new SimpleSchema([userSchema]);
