import {Meteor} from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from '/imports/components/App';
import {Users} from '/imports/api/users';
Meteor.startup(() => {
    render((
        <BrowserRouter>
            {!Users.getLoggedIn() ? (
                    <App/>
                ) : (
                    <h1>You must be logged in to use this app!</h1>
                )}
        </BrowserRouter>
    ), document.getElementById('app'));
});
