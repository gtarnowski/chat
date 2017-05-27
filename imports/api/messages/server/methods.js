import {ValidatedMethod} from '/imports/lib';
import {Messages} from '/imports/api/messages';

export const createMessage = new ValidatedMethod({
    name: 'message.create',
    access: 'public',
    schema: {
        text: {
            type: String
        },
    },
    run ({text, userId}) {
        if (!this.userId) {
            return;
        }

        Messages.insert({text, userId})
    }
});