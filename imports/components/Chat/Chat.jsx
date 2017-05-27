import React, {Component} from 'react';
import {Container, TextArea, Form, Button} from 'semantic-ui-react';
import {callMethod} from '/imports/lib'
//Components
import Messages from '/imports/components/Messages';
import Settings from '/imports/components/Settings';
import {Users} from '/imports/api/users';

export default class Chat extends Component {
    render() {
        return (
            <div>
                <Messages/>
                <ChatControls />
            </div>
        )
    }
}

export class ChatControls extends Component {
    state = {open: false};
    onModalSwitch = (e) => {
        e.preventDefault();
        this.setState({open: this.state.open ? false : true});
    };

    userState = (e) => {
        callMethod('setUserState');
    };

    render() {
        const {open} = this.state;
        const onSubmit = (e) => {
            let target = e.target
            if (e.which == 13 || e.keyCode == 13) {
                e.preventDefault()
                const text = target.value;
                target.value = '';
                target.style.height = '41px';
                callMethod('message.create', {text})
            }
        };
        return (
            <div>
            <Form className="chat-controls chat-main-container">
                <Form.Field>
                    <TextArea className="message-control" onKeyPress={onSubmit} placeholder="Wiadomość..." autoHeight onBlur={this.userState} onClick={this.userState}/>
                    <Button circular basic color='grey' icon='setting' className="settings-controls" onClick={this.onModalSwitch}/>
                </Form.Field>
            </Form>

                <Settings open={open} onClose={this.onModalSwitch} />
            </div>

        )
    }
}