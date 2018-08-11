import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
      const messageItems = this.props.messages.map(aMessage => 
                (<Message key={aMessage.id} message={aMessage} currentUser={this.props.currentUser} />))
      return (
        <main className="messages">
          {messageItems}
        </main>
      );
  }
}

export default MessageList;

