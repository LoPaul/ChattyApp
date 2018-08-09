import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'

class App extends Component {
  // Set initial state so the component is initially "loading"
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      userCount: 1,
      currentUser: {name: "Bob"},
      messages: [] };
    this.addMessage = this.addMessage.bind(this);
  }
  socketSend(notificationType, jsonMsg) {
    jsonMsg.type = notificationType;
    this.socket.send(JSON.stringify(jsonMsg))
  }
  addMessage(userName, message) {
    const newState = this.state;
    var oldUsername = this.state.currentUser.name;
    var nameChanged = oldUsername !== userName;

    if(nameChanged) {
      this.state.currentUser = {name: userName}
      this.socketSend("postNotification", {content: `**${oldUsername}** changed their name to **${userName}**`});
    }
    if(message) {
      const newMessage = {color: this.state.color, username: userName, content: message};
      this.socketSend("postMessage", newMessage)
    }
  }
  processIncomingMessage(data) {
    var newState = this.state;
    var message = JSON.parse(data);
    if(message.type === "incomingAllMessages") {
      newState.messages = message.content;
    }
    if(message.type === "incomingDefaultColor") {
      newState.color = message.content;
    }
    if(message.type === "IncomingUserNotifiation") {
      newState.userCount = message.userCount;
    }
    if((message.type === "incomingMessage" || message.type == "incomingNotification") &&
      (!this.state.messages.some(each => each.type === message.type && each.id === message.id))) {
        newState.messages = [...this.state.messages, message];
      }
    this.setState(newState);
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://127.0.0.1:3001")
    this.socket.onopen = (ev) => {
      this.socket.onmessage = (ev) => {
        this.processIncomingMessage(ev.data)
      }
    }
  }

  render() {
      return (
        <div>
          <NavBar userCount={this.state.userCount} />
          <div>
            <MessageList messages={this.state.messages}/>
            <ChatBar addMessage={this.addMessage} currentUserName={this.state.currentUser.name}/>
          </div>
        </div>
      );
  }
}

export default App;
