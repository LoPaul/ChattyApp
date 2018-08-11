import React, {Component} from 'react';

class Message extends Component {
  render() {
    const message = this.props.message;
    const messageType = message.type;
    if(messageType === "incomingMessage") {
      const isMyMessage = message.user.userID === this.props.currentUser.userID;
      const cssClassName = "triangle-" + (isMyMessage ? "right-" : "left-") + this.props.message.color;
      var messageComp = 
        (<div>
          <p className={cssClassName}>
          {this.props.message.content} <br/><br/>
          <em>{this.props.message.user.name}</em></p>
        </div>
        )
      }
    if(messageType === "incomingNotification" || 
        messageType === "IncomingSessionTerminationNotification" ||
        messageType === "IncomingSessionConnectionNotification") {
      var notificationComp = 
          (<div className="speech-bubble"  style={{textAlign: "center"}}>
            <p className="notify-message">{this.props.message.content}</p>
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
