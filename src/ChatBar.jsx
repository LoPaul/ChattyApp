import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    // on form submit, inform parent component of new message.
    const onSubmit = event => {
      event.preventDefault();
      this.props.addMessage(event.target.elements.username.value, event.target.elements.message.value)
      event.target.elements.message.value = "";
    };
    return (
      <footer className="chatbar">
        <form onSubmit={onSubmit}>
          <input name="username" className="chatbar-username" defaultValue={this.props.currentUserName}/>
          <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
          <input style={{display: "none"}} type="submit" />
        </form>
      </footer>
      );
  }
}

export default ChatBar