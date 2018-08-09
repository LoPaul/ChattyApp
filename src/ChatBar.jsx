import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const onSubmit = event => {
      // console.log("currentUserName...", this.props.currentUserName.name)
      event.preventDefault();
      this.props.addMessage(event.target.elements.username.value, event.target.elements.message.value)
      event.target.elements.message.value = "";
    };

      return (
        <footer className="chatbar">
          <form onSubmit={onSubmit}>
            <input name="username" className="chatbar-username" defaultValue={this.props.currentUserName} placeholder="Your Name (Optional)"  />
            <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
            <input style={{display: "none"}} type="submit" />
          </form>
        </footer>
        );
  }

}

export default ChatBar