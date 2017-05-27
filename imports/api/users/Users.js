import {UniUsers} from 'meteor/universe:collection';

//Schema's
import {userMainSchema} from '/imports/api/users/schema.js';

//Alias
export const Users = UniUsers;

Users.setSchema('default', userMainSchema);
