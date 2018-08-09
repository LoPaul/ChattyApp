import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    console.log("Messages", this.props.messages)
      const messageItems = this.props.messages.map(aMessage => (<Message key={aMessage.id} message={aMessage} />))
      return (
        <main className="messages">
          {messageItems}
        </main>);
  }

}

export default MessageList;

