import {Meteor} from 'meteor/meteor';
import {Promise} from 'meteor/promise';
import {Match, check} from 'meteor/check';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import _ from 'lodash';

import {Users} from '/imports/api/users';

/**
 * ValidatedMethod constructor available options
 */
const validateOptions = new SimpleSchema({
    name: {
        type: String
    },
    run: {
        type: Function
    },
    access: {
        type: String,
        defaultValue: 'user',
        allowedValues: ['public', 'user', 'admin']
    },
    schema: {
        type: Object,
        blackbox: true
    }
}).validator({clean: true});

/**
 * Create Meteor method using project best practices and validates request data
 * Based on mdg:validated-method
 * @param {string} name - method name
 * @param {function} run - method body
 * @param {access} access - access level for this method, either public, user or admin
 * @param {object} schema - SimpleSchema options to validate incoming arguments
 * @returns {ValidatedMethod} - registered method
 */
export class ValidatedMethod {
    constructor (options = {}) {
        // Verify options and add default values
        validateOptions(options);

        // Attach all options to the ValidatedMethod instance (because ValidatedMethod did so)
        _.extend(this, options);

        // Support plain ss options
        this.schema = new SimpleSchema(options.schema);

        // Build validation method based on passed schema
        this.validate = this.schema.validator({clean: true});

        // Register new method
        const instance = this;
        Meteor.methods({
            [this.name] (args = {}) {
                return instance._execute(this, args); // `this` over here reference the methodInvocation object
            }
        });
    }

    async _execute (methodInvocation = {}, args) {
        // Validate passed arguments and silence audit-argument-checks
        check(args, Match.Any);
        this.validate(args);

        // Verify access level
        switch (this.access) {
            case 'public': // No verification required, allow everyone to execute this function
                break;

            case 'user': // User must be logged in
                if (!methodInvocation.userId) {
                    throw new Meteor.Error('403', 'You must be logged in to perform this action');
                }
                break;

            case 'admin': { // User must be an admin
                const user = Users.findOne(methodInvocation.userId);
                if (!user || !user.isAdmin()) {
                    throw new Meteor.Error('403', 'You must be logged in as admin to perform this action');
                }
                break;
            }

            default:
                throw new Meteor.Error('403', 'Access level not supported');
        }

        // Execute method body
        return this.run.bind(methodInvocation)(args);
    }
}

/**
 * Call registered ValidatedMethod (or any other Meteor method).
 * This will return a promise!
 * @param {string} name - method name
 * @param {*} args - arguments passed to the method
 * @param {{}} options - options for Meteor.apply
 * @param {boolean} [options.returnStubValue=false] - should it return stub value (not supported in promise API)
 * @param {boolean} [options.throwStubExceptions=true] - should it throw error from the the simulation
 * @returns {*} - promise with result of the method call
 */
export const callMethod = (name = '', args = {}, options = {}) => {
    const defaultOptions = {
        // Don't call the server method if the client stub throws an error, so that we don't end
        // up doing validations twice
        throwStubExceptions: true,
        returnStubValue: false
    };

    // Promisify Meteor method call
    return new Promise((resolve, reject) => {
        Meteor.apply(
            name,
            [args],
            {...defaultOptions, ...options},
            (err, result) => err ? reject(err) : resolve(result)
        );
    });
};
