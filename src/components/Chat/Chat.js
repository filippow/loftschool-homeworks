import React, {Component} from 'react';
import './Chat.css';
import Message from '../Message';

export default class Chat extends Component {
    state = {
        messages: [],
        messageInput: ''
    };

    changeInputMessage = ({ target }) => {
        this.setState({ messageInput: target.value });
    }

    sendMessageOnEnter = (event) => {
        let {messages, messageInput} = this.state;

        if (event.key === 'Enter' && messageInput) {
            messages = [...messages, {text: messageInput}]
            this.setState({ messages: messages, messageInput: "" });
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.messages.length != this.state.messages.length) {
            let messageListElement = document.querySelector('.message-list');

            if (messageListElement) {
                messageListElement.scrollTop = messageListElement.scrollHeight;
            }
        }
    }

    render() {
        let {messageInput, messages} = this.state;

        return (
            <div className="chat">
                <div className="message-list">
                    <div className="messages">
                        {messages.map((item, index) => {
                            return <Message text={item.text} key={`${item.text}${index}`}></Message>
                        })}
                    </div>
                </div>
                <input
                    className="input-message"
                    value = {messageInput}
                    onChange={this.changeInputMessage.bind(this)}
                    onKeyPress={this.sendMessageOnEnter.bind(this)}
                ></input>
            </div>
        )
    }
}
