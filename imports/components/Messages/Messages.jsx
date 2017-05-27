import React, {Component} from 'react';
import {Users} from '/imports/api/users';
import {Container, Segment, Label, Popup} from 'semantic-ui-react';
import moment from 'moment';

const style = {
    borderRadius: 0,
    opacity: 0.7,
    padding: '0.8em',
};

export default class Messages extends Component {

    render() {
        const {
            messages
        } = this.props;
        const userId = Users.getLoggedInId();

        const fromOrTo = (createdBy, userId) => {
            return createdBy === userId
        };

        const user = Users.getLoggedIn();
        const settings = user.settings
        return (
            <Container className="chat-main-container chat-container" id="messages">
                {messages.map(({_id, text, createdBy, createdAt}) => (
                    <Container
                        key={_id}
                        textAlign={fromOrTo(createdBy, userId) ? 'right' : 'left'}
                        className="test"
                    >

                        <Popup
                            content={moment(createdAt).format(`HH:mm ${"|"} DD-MM-YYYY`)}
                            style={style}
                            inverted
                            position={fromOrTo(createdBy, userId) ? "left center" : "right center"}
                            trigger={
                                <Label
                                    size="large"
                                    color={fromOrTo(createdBy, userId) ? settings.from : settings.to}
                                    pointing={fromOrTo(createdBy, userId) ? 'right' : 'left'}
                                    className="single-message"
                                    content={text}
                                />
                            }
                        />

                    </Container>
                ))}
            </Container>
        )
    }

    componentDidMount() {
        let element = document.getElementById("messages")
        return element.scrollTop = element.scrollHeight;
    }

    componentDidUpdate() {
        let element = document.getElementById("messages")
        return element.scrollTop = element.scrollHeight;
    }
};

