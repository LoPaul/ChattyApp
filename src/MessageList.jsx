import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
      const messageItems = this.props.messages.map(aMessage => (<Message key={aMessage.id} message={aMessage} />))
      return (
        <main className="messages">
          {messageItems}
        </main>);
  }

}

export default MessageList;



// {
//   currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
//   messages: [
//     {
//       username: "Bob",
//       content: "Has anyone seen my marbles?",
//     },
//     {
//       username: "Anonymous",
//       content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
//     }
//   ]
// }
