import {composeWithTracker} from '/imports/lib';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';

//Component
import App from './App';

const getData = (props = {},onData) => {

    onData(null,{
        isLoggedIn: Meteor.userId()
    });
};

export default _.flowRight(
    withRouter,
    composeWithTracker(getData)
)(App);

