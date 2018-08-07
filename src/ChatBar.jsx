import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const onSubmit = event => {
      event.preventDefault();
      this.props.addNewMessage(event.target.elements.username.value, event.target.elements.message.value)
      event.target.elements.message.value = "";
    };
      return (
        <footer className="chatbar">
          <form onSubmit={onSubmit}>
            <input name="username" className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUserName} />
            <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
            <input style={{display: "none"}} type="submit" />
          </form>
        </footer>
        );
  }

}

export default ChatBar