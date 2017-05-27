import React, {Component} from 'react';
import {Container, Segment, Grid, Message} from 'semantic-ui-react'
import {AutoForm, SubmitField, TextField} from 'uniforms-semantic';
import {Meteor} from 'meteor/meteor';
import  {SimpleSchema} from 'meteor/aldeed:simple-schema';
const schema = new SimpleSchema({
    login: {
        type: String
    },
    password: {
        type: String
    }
});

export default class Login extends Component {
    constructor () {
        super(...arguments);

        this.state = {error: null};

        this.onSubmit         = this.onSubmit.bind(this);
    }

    onSubmit = (data) => {
        const self = this;
        console.log(data)
        Meteor.loginWithPassword(data.login, data.password, function (error) {
            if (error) {
                self.setState({error: error.reason})
            }else {
                self.setState({error: null})
                self.props.history.push('/chat')
            }
        })
    };

    render () {
        const {error} = this.state;
        return (
            <Container className="login-container">
                <Segment>
                    <AutoForm schema={schema} onSubmit={this.onSubmit}>
                        <TextField name="login" placeholder="login" />
                        <TextField name="password" placeholder="password" type="password"/>
                        <SubmitField value="Log In" className="basic blue"/>
                        {error && (<Message negative content={error}/>)}
                    </AutoForm>
                </Segment>
            </Container>
        )
    }
}