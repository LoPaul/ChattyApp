import React, {Component} from 'react';



class Message extends Component {
  render() {
    console.log("props message", this.props.message)
    var messageType = this.props.message.type = this.props.message.type;

      if(messageType === "incomingMessage") {
        var messageComp = 
                  (<div className="message">
                    <span className="message-username">{this.props.message.username}</span>
                    <span className="message-content">{this.props.message.content}</span>
                    </div>  );
         }
      if(messageType === "incomingNotification") {
        var notificationComp = 
            (<div className="message system">
              {this.props.message.content}
            </div>)
      }
      return (
        <div>
          {messageComp}
          {notificationComp}
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