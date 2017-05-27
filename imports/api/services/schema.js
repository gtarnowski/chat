import  {SimpleSchema} from 'meteor/aldeed:simple-schema';
import moment from 'moment';
export const updateSchema = new SimpleSchema({
    updatedAt: {
        type: Number,
        autoValue () {
            return +(moment());
        },
        optional: true
    },
    updatedBy: {
        type: String,
        optional: true,
        autoValue () {
            // in case of sync this field will not be set because userId will be null;
            if (this.userId) {
                return this.userId;
            }
            this.unset();
            return undefined;
        }
    }
});

export const createSchema = new SimpleSchema({
    createdAt: {
        type: Number,
        autoValue () {
            if (this.isInsert) {
                return +(moment());
            } else if (this.isUpsert) {
                return {$setOnInsert: +(moment())};
            }
            return undefined;
        },
        optional: true
    },
    createdBy: {
        type: String,
        optional: true,
        autoValue () {
            // in case of sync this field will not be set because userId will be null
            if (this.isInsert && this.userId) {
                return this.userId;
            }
            return undefined;
        }
    },
    isDeleted: {
        type: Boolean,
        autoValue () {
            if (this.isInsert) {
                return false;
            } else if (this.isUpsert) {
                return {$setOnInsert: false};
            }
            return undefined;
        }
    }
});

export const idSchema = new SimpleSchema({
    _id: {
        type: String
    }
})