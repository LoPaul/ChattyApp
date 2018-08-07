import React, {Component} from 'react';



class Message extends Component {
  render() {
      return (
        <div>
          <div className="message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}}</span>
          </div>
        </div>
    );
  }

}

export default Message;


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


// <div>
// <div className="message">
//   <span className="message-username">{this.props.message.username}</span>
//   <span className="message-content">{this.props.message.content}}</span>
// </div>
// <div className="message system">
//   Anonymous1 changed their name to nomnom.
// </div>
// </div>