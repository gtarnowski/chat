import {UniCollection} from 'meteor/universe:collection';

//Schema's
import {mainMessageSchema} from './schema';

//New Collection
export const Messages = new UniCollection('messages');

Messages.setSchema('default', mainMessageSchema);


