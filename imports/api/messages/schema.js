import  {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {updateSchema, createSchema} from '/imports/api/services'

export const messageSchema = new SimpleSchema({
    userId: {
        type: String,
        optional: true
    },
    text: {
        type: String
    },
});

export const mainMessageSchema = new SimpleSchema([messageSchema, createSchema, updateSchema]);