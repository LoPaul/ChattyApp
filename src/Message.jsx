import React, {Component} from 'react';

class Message extends Component {
  render() {
    var messageType = this.props.message.type = this.props.message.type;

    if(messageType === "incomingMessage") {
      var messageComp = 
                (<div className="message">
                  <span className="message-username"  style = {{color: this.props.message.color}}>{this.props.message.username}</span>
                  <span className="message-content">{this.props.message.content}</span>
                  </div>  );
        }
    if(messageType === "incomingNotification" || 
        messageType === "IncomingSessionTerminationNotification" ||
        messageType === "IncomingSessionConnectionNotification") {
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

