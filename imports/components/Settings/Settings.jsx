import React, {Component} from 'react';
import {callMethod} from '/imports/lib'
import {Modal, Form, Checkbox, Label, Button} from 'semantic-ui-react'
export default class Settings extends Component {
    setColorsTo = (color) => () => {
        callMethod('setToColor', {color})
    };

    setColorsFrom = (color) => () => {
        callMethod('setFromColor', {color})
    };

    render () {
        const {onClose,open} = this.props;
        const colors = [
            'red', 'orange', 'yellow', 'olive', 'green', 'teal',
            'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black',
        ];
        return (
            <Modal open={open} onClose={onClose} dimmer={false}>
                <Modal.Header>Ustawienia</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                Kolor: Twój
                                <div>
                                    {colors.map(color => <Label className="color-lab" circular color={color} empty key={color} onClick={this.setColorsFrom(color)}/>)}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                Kolor: Nadawca
                                <div>
                                    {colors.map(color => <Label className="color-lab" circular color={color} empty key={color} onClick={this.setColorsTo(color)}/>)}
                                </div>
                            </Form.Field>
                        </Form>
                        <br/>
                        <Button type="button" content="Zamknij" color="green" basic onClick={onClose}/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}