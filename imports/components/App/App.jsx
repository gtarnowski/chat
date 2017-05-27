import React, {Component, PropTypes} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Chat from '/imports/components/Chat';
import Login from '/imports/components/Login';

export default class App extends Component {

    render() {
        return (
            <div>
                {this.props.isLoggedIn ? (
                    <Switch>
                        <Route path="/" exact render={() => <Redirect to="/chat" />} />
                        <Route path="/chat" component={Chat}/>
                    </Switch>

                    ) : (
                        <Switch>
                            <Route path="/" exact render={() => <Redirect to="/login" />} />
                            <Route path="/login" component={Login}/>
                        </Switch>
                    )}
            </div>
        )
    }
}
